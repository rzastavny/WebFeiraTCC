import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the DetailProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})
export class DetailProductPage {
  produto = {
    nome: '',
    descricao: '',
    url: '',
    origem: '',
    categoria: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    cel: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if (this.navParams.get('produto') != null) {
      this.produto = this.navParams.get('produto');
      console.log(this.produto);
    }


  }

}
