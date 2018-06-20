import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { RegisterproductPage } from '../registerproduct/registerproduct';
import { Observable } from 'rxjs/Observable';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { UserProvider } from '../../providers/user/user';

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
  photo: any;
  profile = {} as Profile;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private provider: CadastrarProdutoProvider,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private fireDB: AngularFireDatabase,
    private camera: Camera,
    private providerUser: UserProvider,
    private loadCtrl: LoadingController) {

    // this.profile = this.navParams.get('profile');
    this.produtos = this.provider.buscarPorProdutor();
  }

  ionViewDidLoad() {
    this.providerUser.getUser().on('value', profile => {
      this.profile = profile.val();
    });
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
    this.navCtrl.push(RegisterproductPage, { perfil: this.profile });
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Desconectar',
      message: 'Você realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {

            let load = this.loadCtrl.create({
              content: 'Desconectando...'
            });

            load.present();

            const userId: string = firebase.auth().currentUser.uid;
            firebase.database().ref(`/users/${userId}`).off();
            firebase.auth().signOut().then(() => {

              load.dismiss().then(() => {
                this.navCtrl.setRoot(HomePage).then(() => {
                  this.toast.create({
                    message: 'Volte sempre!',
                    duration: 2000,
                    position: 'top',
                    cssClass: 'isValidToast'
                  }).present();
                })
              });

            });

          }
        }
      ]
    });

    alert.present();
  }
}
