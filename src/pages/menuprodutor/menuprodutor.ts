import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RegisterproductPage } from '../registerproduct/registerproduct';
import { Observable } from 'rxjs/Observable';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { HomePage } from '../home/home';

/**
 * Generated class for the MenuprodutorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menuprodutor',
  templateUrl: 'menuprodutor.html',
})
export class MenuprodutorPage {
  produtos: Observable<any>;
  informacoes: any;
  produtosqtd: any = 0;
  feiras: any;
  profile = {} as Profile;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastrarProdutoProvider,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private fireDB: AngularFireDatabase) {

    this.profile = this.navParams.get('profile');
    this.produtos = this.provider.buscarPorProdutor();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuprodutorPage');

  }

  editarProduto(produto: any) {
    this.navCtrl.push(RegisterproductPage, { produto: produto });
  }

  excluirProduto(key: string) {
    let confirm = this.alertCtrl.create({
      title: 'Excluir Produto',
      message: 'Tem certeza de que deseja excluir este produto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.provider.excluir(key)
              .then(() => {
                this.toast.create({
                  message: 'Produto removido',
                  duration: 3000
                }).present();
              })
              .catch((e) => {
                this.toast.create({
                  message: 'Erro ao remover produto',
                  duration: 3000
                }).present();
                console.error(e);
              })
          }
        }
      ]
    });
    confirm.present();

  }

  goRegisterPage(): void {
    this.navCtrl.push(RegisterproductPage);
  }

  adicionarProduto() {
    this.produtosqtd++;
  }

  logout(){
    this.navCtrl.push(HomePage);
  }



}
