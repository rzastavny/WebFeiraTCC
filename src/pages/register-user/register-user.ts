import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { CreateProfilePage } from '../create-profile/create-profile';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  @ViewChild('myemail') myemail;
  @ViewChild('senha') senha;

  email: string;
  password: string;
  passwordConfirm: string;
  isPasswordConfirm: boolean = false;
  passwordCheck: boolean = false;
  passwordLength: number = 12;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: AngularFireAuth,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  //Método que verifica se a senha digitada possui o número mínimo de caracteres.
  isPasswordValid() {
    if (this.password.length >= 8) {
      this.passwordCheck = true;
    } else {
      this.passwordCheck = false;
    }
  }

  //isPasswordConfirmValid(){
  //if (this.password = this.passwordConfirm){
  //this.isPasswordConfirm = true;
  //}
  //else{
  //this.isPasswordConfirm = false;
  //}
  //}

  presentToast(message: string, duration: number, position: string, style: string) {
    this.toastCtrl.create({

      message: message,
      duration: duration,
      position: position,
      cssClass: style

    }).present();
  }

  //Método que cadastra um novo produtor.
  cadastrar() {
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
      //usuário cadastrado com sucesso.
      .then(() => {
        this.presentToast('Sua conta foi criada com sucesso!', 3000, 'top', 'isValidToast');
        this.navCtrl.push(CreateProfilePage);
      })
      //tratamento de erro caso não seja possível ser feito o cadastro.
      .catch(error => {

        console.log(error);
        let errorMsg: string;
        switch (error.code) {
          case 'auth/network-request-failed':
            errorMsg = "Não há conexão com a internet.";
            break;

          case 'auth/email-already-in-use':
            errorMsg = "E-mail já existente. Tente outro e-mail."
            break;

          case 'auth/invalid-email':
            errorMsg = "Este e-mail é inválido."
            break;

          case 'auth/operation-not-allowed':
            errorMsg = "Parece que sua conta está desativada!"
            break;

          case 'auth/weak-password':
            errorMsg = "Senha fraca, crie uma senha mais forte."
            break;

        }
        this.presentToast(errorMsg, 3000, 'top', 'isNotValidToast');

      });
  }
}
