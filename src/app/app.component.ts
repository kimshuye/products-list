import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'  ]
})
export class AppComponent {
  title = 'app';

  user: Observable<firebase.User>;
  authenticated:boolean = false;

  isLoggedIn : boolean;
  displayname;
  email;



  constructor(
    public authService:AuthService,
    private router:Router
  ){
    this.authService.af.authState.subscribe(auth =>{
      if(auth == null){
        // not logged in
        this.user = null;
        this.authenticated = false;

        this.isLoggedIn = false;
        this.displayname = '';
        this.email = '';
        // this.router.navigate(['login']);
      }else{
        // logged in
        this.user = authService.af.authState;
        this.authenticated = true;

        this.isLoggedIn = true;
        this.displayname = auth.displayName;
        this.email = auth.email;
        // this.router.navigate(['']);
      }
    });
  }
}
