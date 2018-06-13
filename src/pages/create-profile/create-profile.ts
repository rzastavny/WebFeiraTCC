import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { MenuprodutorPage } from '../menuprodutor/menuprodutor';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the CreateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})
export class CreateProfilePage {

  @ViewChild(Slides) slides: Slides;
  
  profile = {} as Profile;
  isCreating: boolean = false;

  isValidName: boolean = false;
  isValidLastName: boolean = false;

  email: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fireAuth: AngularFireAuth,
    private fireDB: AngularFireDatabase,
    private provider: UserProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }

  presentToast(message: string, duration: number, position: string, style: string) {
    this.toastCtrl.create({

      message: message,
      duration: duration,
      position: position,
      cssClass: style

    }).present();
  }

  updateProfile() {
    this.navCtrl.getPrevious().data.isUpdating = true;
    this.navCtrl.pop();
  }

  checkingName() {
    if ((this.profile.firstName != null) && (this.profile.firstName.length >= 3)) {
      this.isValidName = true;
    } else {
      this.isValidName = false;
    }
  }

  checkingLastName() {
    if ((this.profile.lastName != null) && (this.profile.lastName.length >= 3)) {
      this.isValidLastName = true;
    } else {
      this.isValidLastName = false;
    }
  }

  iniciateSlides() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  slideNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  createProfile() {

    this.isCreating = true;
    this.fireAuth.authState.subscribe(auth => {

      this.profile.email = auth.email;

      this.provider.saveOrUpdate(this.profile)
        .then(() => {
          this.presentToast('Perfil criado com sucesso!', 3000, 'top', 'isValidToast');
          this.navCtrl.setRoot(MenuprodutorPage);
        }).catch(e => {
          console.log(e);

        })
    })

  }
}
