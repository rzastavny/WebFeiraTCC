import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuprodutorPage } from '../menuprodutor/menuprodutor';
import { CreateProfilePage } from '../create-profile/create-profile';
import { User } from '@firebase/auth-types';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../models/profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('myemail') myemail;
  @ViewChild('senha') senha;

  loading: any;
  profile = {} as Profile;
  user = {} as User
  email: string;
  password: string;
  passwordCheck: boolean = false;
  passwordLength: number = 12;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: AngularFireAuth,
    private toastCtrl: ToastController,
    private userProvieder: UserProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //Ir para a página de registro de conta.
  goToRegisterUser(): void {
    this.navCtrl.push(RegisterUserPage);
  }

  //Verifica se a senha possui uma quantidade válida de caracteres.
  isPasswordValid() {
    if (this.password.length >= 8) {
      this.passwordCheck = true;
    } else {
      this.passwordCheck = false;
    }
  }

  //Criando o ToastController.
  presentToast(message: string, duration: number, position: string, style: string) {
    this.toastCtrl.create({

      message: message,
      duration: duration,
      position: position,
      cssClass: style

    }).present();
  }

  //Método que faz o Login do produtor.
  logar() {
    let loader = this.loadingCtrl.create({
      content: "Fazendo login...",
      spinner: 'bubbles'
    });
    loader.present();

    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        loader.dismiss();


        this.userProvieder.getUser().on('value', profile => {
          this.profile = profile.val();
          if (this.profile.firstName) {
            this.navCtrl.setRoot(MenuprodutorPage).then(() => {
              this.presentToast("Bem vindo!", 3000, 'top', 'isValidToast')
            });
          } else {
            this.navCtrl.push(CreateProfilePage);
          }
        })
        // this.userProvieder.getUser().subscribe(profiles => {

        //   //Se existir perfil, fará o login diretamente para o perfil do produtor.
        //   if (profiles.length > 0) {
        //     profiles.forEach(profile => {
        //       this.profile = profile;
        //     });
        //     this.navCtrl.setRoot(MenuprodutorPage, {
        //       profile: this.profile
        //     });
        //     this.presentToast("Bem vindo!", 3000, 'top', 'isValidToast');

        //   } 

        //   //Se não existir perfil, chama a página para criar um perfil.
        //   else {
        //     this.navCtrl.push(CreateProfilePage);
        //   }
        // })
      })

      //Excessões em que o login não é possível.
      .catch(error => {
        loader.dismiss();
        console.log(error);

        let errorMsg: string;
        switch (error.code) {
          case 'auth/network-request-failed':
            errorMsg = "Não há conexão com a internet.";

            break;

          case 'auth/user-not-found':
            errorMsg = "E-mail não cadastrado.";

            this.email = null;
            this.password = null;

            break;

          case 'auth/wrong-password':
            errorMsg = "Senha incorreta!";

            this.password = null;
            this.passwordCheck = false;

            break;
        }
        this.presentToast(errorMsg, 3000, 'top', 'isNotValidToast');

      });
  }
}
