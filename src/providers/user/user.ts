import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProvider {

  private PATH = 'users/';
  

  constructor(private fireDB: AngularFireDatabase,
    private fireAuth: AngularFireAuth) {
  }

  buscar(key: string) {
    return this.fireDB.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return {
          key: c.key, ...c.payload.val()
        };
      });
  }


  saveOrUpdate(user: any) {

    return this.fireDB.database.ref(this.PATH + this.fireAuth.auth.currentUser.uid).update({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      emailContact: user.emailContact,
      tel: user.tel,
      cel: user.cel
    })

    // return new Promise((resolve, reject) => {
    //   if (user.key) {
    //     this.fireDB.list(this.PATH).update(user.key,
    //       {
    //         email: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         emailContact: user.emailContact,
    //         tel: user.tel,
    //         cel: user.cel
    //       })
    //       .then(() => resolve())
    //       .catch((e) => reject());
    //   } else {
    //     this.fireDB.list(this.PATH + this.fireAuth.auth.currentUser.uid).push(
    //       {
    //         email: user.email,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         emailContact: user.emailContact,
    //         tel: user.tel,
    //         cel: user.cel
    //       })
    //       .then(() => resolve());
    //   }
    // });
  }

  getUser() {

    return this.fireDB.database.ref(this.PATH + this.fireAuth.auth.currentUser.uid);

    // return this.fireDB.list(this.PATH + this.fireAuth.auth.currentUser.uid)
    //   .snapshotChanges()
    //   .map(changes => {
    //     return changes.map(c => ({
    //       key: c.payload.key, ...c.payload.val()
    //     }));
    //   })
  }
}
