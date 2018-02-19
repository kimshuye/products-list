import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Observable<any[]>;
  allProducts: any;

  constructor(private db: AngularFireDatabase) { 
    this.products = db.list('/products').valueChanges();
    this.products.subscribe(snapProducts => {
      this.allProducts = snapProducts;
      
    });

  }

  ngOnInit() {
  }

}
