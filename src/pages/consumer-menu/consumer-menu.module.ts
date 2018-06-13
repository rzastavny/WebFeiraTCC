import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumerMenuPage } from './consumer-menu';

@NgModule({
  declarations: [
    ConsumerMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumerMenuPage),
  ],
})
export class ConsumerMenuPageModule {}
