import { Component, OnInit } from '@angular/core';
import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { FirebaseService ,Product } from '../../services/firebase.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  sku: string;
  name: string;
  barcode: string;
  price: number;
  imageUrl: string;
  rate: number;
  bought: boolean;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router    
  ) { }

  ngOnInit() {
  }

  submitAdd(){
    let product = {
      sku: this.sku,
      name: this.name,
      barcode: this.barcode,
      price: this.price,
      imageUrl: this.imageUrl,
      rate: this.rate,
      bought: this.bought
      
    }
    
    //console.log(product);

    this.firebaseService.addProduct(this.barcode,product);
    this.router.navigate(['products']) ;
  }

}

// export class ProductModel{
//   constructor(
//     sku: string,
//     name: string,
//     barcode: string,
//     price: number,
//     imageUrl: string,
//     rate: number,
//     bought: boolean
//   ) {  }
// }
