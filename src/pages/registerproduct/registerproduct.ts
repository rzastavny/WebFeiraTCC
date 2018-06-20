import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { MenuprodutorPage } from '../menuprodutor/menuprodutor';
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-registerproduct',
  templateUrl: 'registerproduct.html',
})
export class RegisterproductPage {
  loading;
  currentPhoto;
  imgSource;
  photo: any;
  title: string;
  form: FormGroup;
  produto: any;
  profile = {} as Profile;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private provider: CadastrarProdutoProvider,
    private providerUser: UserProvider,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth,
    private fireDB: AngularFireDatabase) {


    this.produto = this.navParams.data.produto || {};
    this.criaForm();
  }

  ionViewDidLoad() {
    this.providerUser.getUser().on('value', profile => {
      this.profile = profile.val();
    });
  }

  criaForm() {
    this.form = this.formBuilder.group({
      key: [this.produto.key],
      nome: [this.produto.nome, Validators.required],
      descricao: [this.produto.descricao, Validators.required],
      origem: [this.produto.origem, Validators.required],
      categoria: [this.produto.categoria, Validators.required],
      chave: [this.fireAuth.auth.currentUser.uid]
    })
  }

  presentToast(message: string, duration: number, position: string, style: string) {
    this.toast.create({

      message: message,
      duration: duration,
      position: position,
      cssClass: style

    }).present();
  }

  pegarFotoAvancado() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {

      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      
    });
  }

  salvar() {
    let loader = this.loadingCtrl.create({
      content: "Cadastrando produto...",
      spinner: 'bubbles'
    });
    loader.present();
    if (this.form.valid) {
      let upload = this.provider.uploadToStorage(this.photo);
      upload.then().then(res => {
        this.provider.storeInfoToDatabase(res.metadata, this.form.value, this.profile).then(() => {
          console.dir(this.profile);
          loader.dismiss();
          this.presentToast("Novo produto cadastrado.", 3000, 'top', 'isValidToast');
          this.navCtrl.push(MenuprodutorPage);
        })
      })
    }
  }
}