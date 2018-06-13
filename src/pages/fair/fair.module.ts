import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FairPage } from './fair';

@NgModule({
  declarations: [
    FairPage,
  ],
  imports: [
    IonicPageModule.forChild(FairPage),
  ],
})
export class FairPageModule {}
