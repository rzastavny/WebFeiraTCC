import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CadastrarProdutoProvider } from '../../providers/cadastrar-produto/cadastrar-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-registerproduct',
  templateUrl: 'registerproduct.html',
})
export class RegisterproductPage {
  loading;
  currentPhoto;
  imgSource;
  photo: any;
  title: string;
  form: FormGroup;
  produto: any;
  files: Observable<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private provider: CadastrarProdutoProvider,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth) {


    this.produto = this.navParams.data.produto || {};
    this.criaForm();

    this.files = this.provider.getFiles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterproductPage');
  }

  criaForm() {
    this.form = this.formBuilder.group({
      key: [this.produto.key],
      nome: [this.produto.nome, Validators.required],
      descricao: [this.produto.descricao, Validators.required],
      origem: [this.produto.origem, Validators.required],
      categoria: [this.produto.categoria, Validators.required],
      chave: [this.fireAuth.auth.currentUser.uid]
    })
  }

  presentToast(message: string, duration: number, position: string, style: string) {
    this.toast.create({

      message: message,
      duration: duration,
      position: position,
      cssClass: style

    }).present();
  }

  pegarFotoAvancado() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.photo = 'data:image/jpeg;base64,' + imageData;
      console.log("tirar"+this.photo);
    }, (err) => {
      console.log(err);
    });
  }

  salvar() {
    if (this.form.valid) {
      let upload = this.provider.uploadToStorage(this.photo);
      upload.then().then(res => {
        this.provider.storeInfoToDatabase(res.metadata, this.form.value).then(() => {
          let toast = this.toast.create({
            message: 'Nova foto adicionada!',
            duration: 3000
          })
          toast.present();
        
      })
    })
  }
}


  // takePhoto() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     targetWidth: 300,
  //     targetHeight: 300
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.loading = this.loadingCtrl.create({
  //       content: "Aguarde..."
  //     })
  //     this.loading.present();
  //     this.photo = this.dataURLtoBlob('data:image/jpeg;base64,' + imageData);
  //     this.upload();

  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  // dataURLtoBlob(myURL) {
  //   let binary = atob(myURL.split(',')[1]);
  //   let array = [];
  //   for (let i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //   }
  //   return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  // }

  // upload() {
  //   if (this.photo) {
  //     var uploadTask =  firebase.storage().ref().child('images/'+this.imageName+'.jpg').put(this.selectedPhoto);
  //     uploadTask.then(this.onSuccess, this.onErrors);
  //   }
  // }

  // onSuccess = (snapshot) => {
  //   this.currentPhoto = snapshot.downloadURL;
  //   this.loading.dismiss();
  // }

  // onErrors = (error) => {
  //   console.log(error);
  //   this.loading.dismiss();
  // }

  // getMyURL() {
  //   firebase.storage().ref().child('images/myphoto.jpg').getDownloadURL().then((url) => {
  //     this.imgSource = url;
  //   })
  // }
  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  pegarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

 



  uploadInformation(text) {
    let upload = this.provider.uploadToStorage(text);
    upload.then().then(res => {
      this.provider.storeInfoToDatabase(res.metadata, this.form.value).then(() => {
        let toast = this.toast.create({
          message: 'New File Added!',
          duration: 3000
        });
        toast.present();
      });
    });
  }

  deleteFile(file) {
    this.provider.deleteFile(file).subscribe(() => {
      let toast = this.toast.create({
        message: 'File Removed!',
        duration: 3000
      });
      toast.present();
    })
  }
}
