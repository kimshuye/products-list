import { Component, OnInit } from '@angular/core';
import { FirebaseService, Product } from '../../services/firebase.service';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  allProducts: any;

  // products:any;

  user: Observable<firebase.User>;
  authenticated:boolean = false;
  isLoggedIn : boolean;
  displayname;
  email;

  constructor(private firebaseService: FirebaseService,
    private authService:AuthService,
    private router:Router
  ) {
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

  ngOnInit() {
    // this.allProducts = this.firebaseService.getProducts().valueChanges();

    // this.firebaseService.getProducts().valueChanges().subscribe(snapProducts => {
    //   this.allProducts = snapProducts;
    // });

    this.allProducts = this.firebaseService.getProducts().snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });


  }

}
