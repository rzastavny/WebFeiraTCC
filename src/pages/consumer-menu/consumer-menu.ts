import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FairPage } from '../fair/fair';
import { SearchProductPage } from '../search-product/search-product';

/**
 * Generated class for the ConsumerMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consumer-menu',
  templateUrl: 'consumer-menu.html',
})
export class ConsumerMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerMenuPage');
  }

  searchFair():void{
    this.navCtrl.push(FairPage);
  }

  searchProduct():void{
    this.navCtrl.push(SearchProductPage);
  }

}
