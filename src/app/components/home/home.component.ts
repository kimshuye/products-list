import { Component, OnInit } from '@angular/core';


import { FirebaseService , Product } from '../../services/firebase.service';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rateProducts : any;
  neverBuyProducts : any;

  user: Observable<firebase.User>;
  authenticated:boolean = false;

  constructor(private fs: FirebaseService,
    private authService:AuthService,private router:Router
  ) { 
    this.user = this.fs.user;
    this.authenticated = this.fs.authenticated;
  }

  ngOnInit() {
    this.fs.getRateProducts().subscribe(snapProducts => {
      this.rateProducts = snapProducts;
      //console.log(this.favoriteProducts);
    });

    this.fs.getNeverBuyProducts().subscribe(snapProducts => {
      this.neverBuyProducts = snapProducts;
      //console.log('Never Products : ' , this.neverBuyProducts);
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
