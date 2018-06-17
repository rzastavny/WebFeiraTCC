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
  produto: any;
  produtos: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.produtos = navParams.data;
    console.log(navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProductPage');
  }

}
