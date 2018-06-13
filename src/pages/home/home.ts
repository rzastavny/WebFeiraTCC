import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ConsumerMenuPage } from '../consumer-menu/consumer-menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToPageLogin():void{
    this.navCtrl.push(LoginPage);
  }

  goToConsumerPage():void{
    this.navCtrl.push(ConsumerMenuPage);
  }
}
