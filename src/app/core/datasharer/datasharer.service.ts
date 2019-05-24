// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs';
// import {UserSession} from '../../shared/models/UserSession';

// @Injectable({
//   providedIn: 'root'
// })
// export class DatasharerService {
//   private session = new BehaviorSubject<any>(new UserSession());
//   private inProfileView = new BehaviorSubject<boolean>(false);
//   userSession = this.session.asObservable();
//   profileViewIsActive = this.inProfileView.asObservable();
//   constructor() { }

  
//   setSession(userSession: UserSession) {
//     this.session.next(userSession)
//   }

//   getSession(){
//     return this.userSession;
//   }

//   setInProfileView(profileViewIsActive:boolean){
//     this.inProfileView.next(profileViewIsActive)
//   }

//   getInProfileView(){
//     return this.profileViewIsActive;
//   }


// }

// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DatasharerService {
//   private isLoggedIn = new BehaviorSubject<boolean>(false);
//   loggedIn = this.isLoggedIn.asObservable();
//   constructor(
//     ) {}

//   setIsLoggedIn(loggedIn:boolean){
//     this.isLoggedIn.next(loggedIn);
//   }
// }
