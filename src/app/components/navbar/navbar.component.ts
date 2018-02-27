import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { FirebaseService , Product } from '../../services/firebase.service';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  authenticated:boolean = false;

  constructor(
    private router:Router,
    private fs: FirebaseService
  ) {
    // this.af.authState.subscribe(auth => {
    //   if(auth!=null){
    //     this.user = this.af.authState;
    //     this.authenticated = true;
    //   }
    // });
    this.user = this.fs.user;
    this.authenticated = this.fs.authenticated;
  }  

  ngOnInit() {
  }

  login(){
    this.fs.login();
    this.user = this.fs.user;
    this.authenticated = this.fs.authenticated;
    this.router.navigate(['home']) ;
  }

  logout(){
    this.fs.logout();
    this.user = this.fs.user;
    this.authenticated = this.fs.authenticated;
    // this.router.navigate(['home']) ;
  }

}
