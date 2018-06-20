import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';
import { DetailProductPage } from '../detail-product/detail-product';
import { Profile } from '../../models/profile';
import { UserProvider } from '../../providers/user/user';

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
  profile = {} as Profile;
  produtor: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastrarProdutoProvider,
    private providerUser: UserProvider) {
    this.initializeItems();
    this.profile = this.navParams.get('profile');
    this.produtos = this.provider.buscarTodos();
    //this.produtor = this.providerUser.buscar(this.produtos.chave);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchProductPage');
  }

  goToDetailsPage(produto) {

    this.produto.nome = produto.nome;
    this.produto.descricao = produto.descricao;
    this.produto.url = produto.url;
    this.produto.origem = produto.origem;
    this.produto.categoria = produto.categoria;
    this.produto.firstName = produto.firstName;
    this.produto.lastName = produto.lastName;
    this.produto.email = produto.email;
    this.produto.tel = produto.tel;
    this.produto.cel = produto.cel;

    this.navCtrl.push(DetailProductPage, {
      produto: this.produto
    })
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
