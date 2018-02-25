import { Component, OnInit } from '@angular/core';
import { Directive, Output, HostListener, asNativeElements, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NativeDateAdapter } from "@angular/material";

import { FirebaseService ,Product  } from '../../services/firebase.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
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
export class EditProductComponent implements OnInit {

  id;
  $key;
  sku;
  name;
  barcode;
  price;
  imageUrl;
  rate;
  bought;
  
  date;
  dateEle;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getProductDetails(this.id).subscribe(snapProduct => {
      this.$key = snapProduct.$key;
      this.sku = snapProduct.sku;
      this.name = snapProduct.name;
      this.barcode = snapProduct.barcode;
      this.price = snapProduct.price;
      this.imageUrl = snapProduct.imageUrl;
      this.rate = snapProduct.rate;
    });
  }

  submitEdit(){
    let product = {
      sku: this.sku,
      name: this.name,
      barcode: this.barcode,
      price: this.price,
      imageUrl: this.imageUrl,
      rate: this.rate
      
    }
    
    // console.log(product);

    this.firebaseService.updateProduct(this.$key,product);
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
