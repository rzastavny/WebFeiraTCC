import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { UserProvider } from '../providers/user/user';
import { CadastrarProdutoProvider } from '../providers/cadastrar-produto/cadastrar-produto';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ConsumerMenuPage } from '../pages/consumer-menu/consumer-menu';
import { RegisterUserPage } from '../pages/register-user/register-user';
import { FairPage } from '../pages/fair/fair';
import { SearchProductPage } from '../pages/search-product/search-product';
import { MenuprodutorPage } from '../pages/menuprodutor/menuprodutor';
import { RegisterproductPage } from '../pages/registerproduct/registerproduct';
import { CreateProfilePage } from '../pages/create-profile/create-profile';

 const config = {
  apiKey: "AIzaSyCHy6NAw_MObH0CS7V4LLQGvi-NO2Wi5pY",
  authDomain: "webfeiradatabase.firebaseapp.com",
  databaseURL: "https://webfeiradatabase.firebaseio.com",
  projectId: "webfeiradatabase",
  storageBucket: "webfeiradatabase.appspot.com",
  messagingSenderId: "679422615841"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ConsumerMenuPage,
    RegisterUserPage,
    FairPage,
    MenuprodutorPage,
    RegisterproductPage,
    SearchProductPage,
    CreateProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ConsumerMenuPage,
    RegisterUserPage,
    FairPage,
    MenuprodutorPage,
    RegisterproductPage,
    SearchProductPage,
    CreateProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    CadastrarProdutoProvider,
    UserProvider,
    Camera,
    ImagePicker

  ]
})
export class AppModule {}
