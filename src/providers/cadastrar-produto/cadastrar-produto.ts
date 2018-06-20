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

  //PRODUTOS
  //Exibe todos os produtos cadastrados.
  buscarTodos() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.key, ...c.payload.val()
        }));
      })
  }

  //Exibe apenas os produtos cadastrados pelo produtor.
  buscarPorProdutor() {
    return this.db.list(this.PATH, ref => ref.orderByChild('chave').equalTo(this.chave))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.key, ...c.payload.val()
        }));
      })
  }

  //Exibe um produto específico.
  buscar(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return {
          key: c.key, ...c.payload.val()
        };
      });
  }

  //Exclui o produto selecionado.
  excluir(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  //FOTOS DOS PRODUTOS
  //
  getFiles(){
    let ref = this.db.list('produtos');
    return ref.snapshotChanges()
    .map(changes=>{
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    })
   }

  uploadToStorage(information): AngularFireUploadTask{
    let nome = `${new Date().getTime()}.jpg`;
    return this.storage.ref(`produtos/${nome}`).putString(information, 'data_url');
  }

  storeInfoToDatabase(metainfo, produto, produtor){
    let toSave = {
    nome: produto.nome,
    descricao: produto.descricao,
    origem: produto.origem,
    categoria: produto.categoria,
    chave: produto.chave,
    dataUpload: metainfo.timeCreated,
    url: metainfo.downloadURLs[0],
    fullPath: metainfo.fullPath,
    contentType: metainfo.contentType,
    firstName: produtor.firstName,
    lastName: produtor.lastName,
    email: produtor.email,
    tel: produtor.tel,
    cel: produtor.cel


    }
    let ref = this.db.list('produtos')
    return ref.push(toSave);
  }

}
