import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router"

import { AuthService } from '../../services/auth.service';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn : boolean;
  displayname;
  email;

  user: Observable<firebase.User>;
  authenticated:boolean = false;

  constructor(
    public authService:AuthService,
    private router:Router
    
  ) {
    // this.af.authState.subscribe(auth => {
    //   if(auth!=null){
    //     this.user = this.af.authState;
    //     this.authenticated = true;
    //   }
    // });
    this.authService.af.authState.subscribe(auth =>{
      if(auth == null){
        // not logged in
        this.user = null;
        this.authenticated = false;

        this.isLoggedIn = false;
        this.displayname = '';
        this.email = '';
        this.router.navigate(['login']);
      }else{
        // logged in
        this.user = authService.af.authState;
        this.authenticated = true;

        this.isLoggedIn = true;
        this.displayname = auth.displayName;
        this.email = auth.email;
        this.router.navigate(['']);
      }
    });
    
  }  

  ngOnInit() {
  }

  login(){
    
  }

  logout(){
    
  }

}
