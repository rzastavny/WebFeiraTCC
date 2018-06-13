import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";

/*
  Generated class for the CadastrarProdutoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastrarProdutoProvider {
  private PATH = 'produtos/';
  private chave: any;

  constructor(private db: AngularFireDatabase,
    private fire: AngularFireAuth,
    private storage: AngularFireStorage) {

        this.chave = this.fire.auth.currentUser.uid;
      
  }
  buscarTodos() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.key, ...c.payload.val()
        }));
      })
  }

  buscarPorProdutor() {
    return this.db.list(this.PATH, ref => ref.orderByChild('chave').equalTo(this.chave))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.key, ...c.payload.val()
        }));
      })
  }

  buscar(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return {
          key: c.key, ...c.payload.val()
        };
      });
  }
  salvar(produto: any, metainfo) {
    return new Promise((resolve, reject) => {
      if (produto.key) {
        this.db.list(this.PATH)
          .update(produto.key, {
            nome: produto.nome,
            descricao: produto.descricao,
            origem: produto.origem,
            categoria: produto.categoria,
            url: metainfo.downloadURLs[0]
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      }
      else {
        this.db.list(this.PATH)
          .push({
            nome: produto.nome,
            descricao: produto.descricao,
            origem: produto.origem,
            categoria: produto.categoria,
            chave: produto.chave,
            url: metainfo.downloadURLs[0]
          })
          .then(() => resolve());
      }
    });
  }
  excluir(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
  limpar() {
    return this.db.list(this.PATH).remove();
  }

  getFiles(){
    let ref = this.db.list('files');
    return ref.snapshotChanges()
    .map(changes=>{
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    })
   }


  uploadToStorage(information): AngularFireUploadTask{
    let nome = `${new Date().getTime()}.jpg`;
    return this.storage.ref(`produtos/${nome}`).putString(information, 'data_url');
  }

  storeInfoToDatabase(metainfo, produto){
    console.log(metainfo.downloadURLs[0])
    let toSave = {
      nome: produto.nome,
      descricao: produto.descricao,
      origem: produto.origem,
      categoria: produto.categoria,
      chave: produto.chave,
      dataUpload: metainfo.timeCreated,
      url: metainfo.downloadURLs[0]
    }
    let ref = this.db.list('produtos')
    return ref.push(toSave);
  }

  deleteFile(file){
    let key = file.key;
    let storagePath = file.fullPath;
    this.db.list('files').remove(key);
    return this.storage.ref(storagePath).delete();
  }

}

