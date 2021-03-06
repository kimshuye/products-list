import { Component, OnInit } from '@angular/core';
import { Directive, Output, HostListener, asNativeElements, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NativeDateAdapter } from "@angular/material";

import { FirebaseService ,Product  } from '../../services/firebase.service';

import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  
})
export class AddProductComponent implements OnInit {

  sku;
  name;
  barcode;
  price;
  imageUrl;
  rate;
  bought;
  
  date;
  dateEle;

  user: Observable<firebase.User>;
  authenticated:boolean = false;
  isLoggedIn : boolean;
  displayname;
  email;

  constructor(
    private firebaseService: FirebaseService,
    private authService:AuthService,
    private router:Router,
    private adapter: DateAdapter<any>
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
  }

  submitAdd(){
    let product = {
      sku: this.sku,
      name: this.name,
      barcode: this.barcode,
      price: this.price,
      imageUrl: this.imageUrl,
      rate: this.rate
      
    }
    
    //console.log(product);

    this.firebaseService.addProduct(this.barcode,product);
    this.router.navigate(['products']) ;
  }

  updateDate(date){    
    this.dateEle = this.adapter.format(date,'input');
    this.date = this.adapter.getDate(date)
    + '/' + (this.adapter.getMonth(date)+1) 
    + '/' + this.adapter.getYear(date);
    // console.log(this.dateval);
    // console.log(this.date);
  }

}


