import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';

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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private provider: CadastrarProdutoProvider,) {
      this.produtos = this.provider.buscarTodos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchProductPage');
  }

}
