import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class FirebaseService {

  
  products : AngularFireList<any[]>;
  
  favoriteProducts: Observable<any>;
  neverBuyProducts: Observable<any>;
  productDetails: Observable<any>;


  shirtsRef;

  path = 'products';

  constructor(private db: AngularFireDatabase) { 
    this.shirtsRef = db.list<Product>(this.path);
  }

  getProducts(){
    this.products = this.db.list(this.path);
    this.products.valueChanges().subscribe(console.log)
    return this.products;
  }

  getFavProducts(){
    this.favoriteProducts = this.db.list<Product>(this.path).valueChanges().map(snapProducts => {
      const topRatedProducts = snapProducts.filter(item => item.rate > 0 );
      return topRatedProducts;
    });
    return this.favoriteProducts;
  }

  getNeverBuyProducts(){
    this.neverBuyProducts = this.db.list<Product>(this.path).valueChanges().map(snapProducts => {
      const never = snapProducts.filter(item => item.bought == null );
      return never;
    });
    return this.neverBuyProducts;
  }

  getProductDetails(id){ 
    this.productDetails = this.db.object<Product>(this.path + '/' + id ).valueChanges() as Observable<any>;
    return this.productDetails;

  }

}

export interface Product{
    sku?: string;
    name?: string; 
    barcode?: string;
    price?: number;
    imageUrl?: string;
    rate?: number;
    bought?: boolean;
}