import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css'  ]
})
export class AppComponent {
  title = 'app';

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
        this.isLoggedIn = false;
        this.displayname = '';
        this.email = '';
        this.router.navigate(['login']);
      }else{
        // logged in
        this.isLoggedIn = true;
        this.displayname = auth.displayName;
        this.email = auth.email;
        this.router.navigate(['']);
      }
    });
  }
}
