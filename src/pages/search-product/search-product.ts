import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';
import { DetailProductPage } from '../detail-product/detail-product';

/**
 * Generated class for the SearchProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-product',
  templateUrl: 'search-product.html',
})
export class SearchProductPage {
  produtos: Observable<any>;
  items: any;
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private provider: CadastrarProdutoProvider,) {
       this.initializeItems();
      this.produtos = this.provider.buscarTodos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchProductPage');
  }

  goToDetailsPage(produtos){
    this.navCtrl.push(DetailProductPage, produtos)

  }

  initializeItems() {
    this.items = this.produtos;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
