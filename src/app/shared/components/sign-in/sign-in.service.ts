import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpService } from '../../../core/http/httpservice.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class SignInService {
    constructor(
        private httpService: HttpService,
        public afAuth: AngularFireAuth
    ) { }

    login(userCreds: User): Observable<any> {
        return this.httpService.postRequest(`login?email=${userCreds.email}&password=${userCreds.password}`, {}, null);
    }

    sininWithGoogle() {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
                .then((authData) => {
                    resolve(authData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
