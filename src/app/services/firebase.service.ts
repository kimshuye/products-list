import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseService {

  
  products : AngularFireList<Product>;
  
  favoriteProducts: Observable<any>;
  neverBuyProducts: Observable<any>;
  productDetails: Observable<any>;


  shirtsRef: any;

  path = 'products';

  constructor(private db: AngularFireDatabase) { 
    this.getProducts();
    this.shirtsRef = this.db;
  }

  getProducts(){
    this.products = this.db.list<Product>(this.path);
    
    return this.products;
  }

  getFavProducts(){
    this.favoriteProducts = this.db.list<Product>(this.path).valueChanges().map(snapProducts => {
      const topRatedProducts = snapProducts.filter(item => item.rate > 0 );
      // console.log(' getFavProducts map');
      return topRatedProducts;
    });
    // console.log(' getFavProducts() ');
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

  addProduct(_id,productDetails){
    var AddProduct = JSON.parse(JSON.stringify( productDetails )); //remotes the undefined fields

    var updates = {};
    updates['/' + this.path + '/' + _id] = AddProduct;

    return this.db.database.ref().update(updates);
  }

}

export interface Product{
  $key?: string;
  sku?: string;
  name?: string; 
  barcode?: string;
  price?: number;
  imageUrl?: string;
  rate?: number;
  bought?: boolean;
}