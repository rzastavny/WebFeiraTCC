import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-fair',
  templateUrl: 'fair.html',
})

export class FairPage {

  key: any;
  markers: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: any;
  destinationPosition: any;
  latLng: any;

  feiras = [{
    nome: 'Feira do Lago',
    endereco: 'R. Salvatore Renna, 820-1012',
    bairro: 'Santa Cruz',
    horarioInicio: '14:00h',
    horarioTermino: '20:00',
    diaSemana: 'Domingo',
    lat: -25.4016948,
    lng: -51.47515858
  }, {
    nome: 'Paróquia Santana',
    endereco: 'Av. Rosa Lustosa de Siqueira, 1104',
    bairro: 'Santana',
    horarioInicio: '14:00h',
    horarioTermino: '18:00h',
    diaSemana: 'Terça-Feira',
    lat: -25.3929279,
    lng: -51.4512425
  }, {
    nome: 'Paróquia Divino Espírito Santo',
    endereco: 'R. Francisco Demário, 405',
    bairro: 'Vila Bela',
    horarioInicio: '14:00h',
    horarioTermino: '18:00h',
    diaSemana: 'Quarta-Feira',
    lat: -25.4009425,
    lng: -51.4935636
  }, {
    nome: 'Paróquia São João Bosco',
    endereco: 'Rua Padre Honorino João Muraro, 208 ',
    bairro: 'Vila Carli',
    horarioInicio: '14:00h',
    horarioTermino: '18:00h',
    diaSemana: 'Quinta-Feira',
    lat: -25.3776723,
    lng: -51.4849132
  }, {
    nome: 'Paróquia Santa Cruz',
    endereco: 'R. Pres. Zacarias de Góes, 961',
    bairro: 'Santa Cruz',
    horarioInicio: '14:00h',
    horarioTermino: '19:00h',
    diaSemana: 'Quinta-Feira',
    lat: -25.405328,
    lng: -51.470678
  }, {
    nome: 'Espaço Cidadão bairro Primavera',
    endereco: 'R. Belchior Dias Moreira, 811',
    bairro: 'Primavera',
    horarioInicio: '14:00h',
    horarioTermino: '18:00h',
    diaSemana: 'Sexta-Feira',
    lat: -25.3563947,
    lng: -51.4776661
  }, {
    nome: 'Escola Municipal Conrado Gonçalves de Oliveira',
    endereco: 'Avenida Antônio Losso, 514.',
    bairro: 'Bonsucesso',
    horarioInicio: '08:00h',
    horarioTermino: '12:00h',
    diaSemana: 'Sábado',
    lat: -25.370966,
    lng: -51.4624277
  }]

  constructor(private geolocation: Geolocation,
    private loadingCtrl: LoadingController) { }

  ionViewDidLoad() {
    this.initializeMap();
  }

  initializeMap() {
    let loader = this.loadingCtrl.create({
      content: "Inicializando mapa...",
      spinner: 'bubbles'
    });
    loader.present();

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        loader.dismiss();
        this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        const mapOptions = {
          zoom: 14,
          center: this.startPosition,
          disableDefaultUI: true
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.directionsDisplay.setMap(this.map);

        const marker = new google.maps.Marker({
          title: "Minha localização",
          position: this.startPosition,
          map: this.map,
          icon: './assets/icon/placeholder.png',
          animation: google.maps.Animation.BOUNCE

        })

        let content = `
    <div id="myid"  class="item item-thumbnail-left item-text-wrap">
      <ion-item>
        <ion-row>
          <h6>`+ marker.title + `</h6>
        </ion-row>
      </ion-item>
    </div>
    `
        this.addInfoWindow(marker, content, this.key);

        marker.setMap(this.map);

        this.loadPoints();

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  loadPoints() {
    this.markers = [];

    for (const key of Object.keys(this.feiras)) {
      let latLng = new google.maps.LatLng(this.feiras[key].lat, this.feiras[key].lng);

      let marker = new google.maps.Marker({
        position: latLng,
        title: this.feiras[key].nome,
        icon: './assets/icon/fair-stand32.png',
        animation: google.maps.Animation.DROP

      })

      let content = `
    <div id="myid" class="item item-thumbnail-left item-text-wrap">
      <ion-item>
        <ion-row>
          <h6>`+ this.feiras[key].nome + `</h6>
          <p> Endereço: `+ this.feiras[key].endereco + `</p>
          <p>Bairro: `+ this.feiras[key].bairro + `</p>
          <p>Dia da Semana: `+ this.feiras[key].diaSemana + `</p>
          <p>Horários: `+ this.feiras[key].horarioInicio + ` ás ` + this.feiras[key].horarioTermino + `</p>
          <button ion-button id="trace-route">Traçar Rota</button>
        </ion-row>
      </ion-item>
    </div>
    `
      this.key = key;
      this.addInfoWindow(marker, content, this.key);
      marker.setMap(this.map);
    }
  }

  addInfoWindow(marker, content, key) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      let coordinatorMap = infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {

        document.getElementById('myid').addEventListener('click', () => {
          this.goToFeira(key)
          infoWindow.close(this.map, marker);
        });
      });
    })
  }

  goToFeira(key) {
    this.calculateRoute(key);
  }

  calculateRoute(key) {
    if (this.feiras) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.startPosition,
        destination: new google.maps.LatLng(this.feiras[key].lat, this.feiras[key].lng),
        travelMode: 'DRIVING' //BICYCLING TRANSIT WALKING
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
      request.destination = null;
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

}
