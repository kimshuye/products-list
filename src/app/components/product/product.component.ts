import { Component, OnInit } from '@angular/core';
import { FirebaseService , Product } from '../../services/firebase.service';
import { ActivatedRoute , Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id:any;
  productInVal: any;

  sku: string;
  name: string; 
  barcode: string;
  price: number;
  imageUrl: string;
  rate: number;
  bought: boolean;

  constructor(private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getProductDetails(this.id).subscribe(snapProduct => {
      console.log('product detail : ' + JSON.stringify(snapProduct) );
      this.productInVal = snapProduct;
      this.sku = snapProduct.sku;
      this.name = snapProduct.name;
      this.barcode = snapProduct.barcode;
      this.price = snapProduct.price;
      this.imageUrl = snapProduct.imageUrl;
      this.rate = snapProduct.rate;
      this.bought = snapProduct.bought;

    });
  }

}
