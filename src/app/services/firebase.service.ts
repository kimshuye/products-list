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

  productspath = 'products';

  constructor(private db: AngularFireDatabase) { 
    this.getProducts();
    this.shirtsRef = this.db;
  }

  getProducts(){
    this.products = this.db.list<Product>(this.productspath);
    
    return this.products;
  }

  getRateProducts(){
    this.favoriteProducts = this.db.list<Product>(this.productspath).snapshotChanges().map(snapProducts => {
      const topRatedProducts = snapProducts.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      return topRatedProducts.filter(item => item.rate > 0 );
    });
    return this.favoriteProducts;
  }

  getNeverBuyProducts(){
    this.neverBuyProducts = this.db.list<Product>(this.productspath).snapshotChanges().map(snapProducts => {
      const never = snapProducts.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      return never.filter(item => item.bought == null );
    });
    return this.neverBuyProducts;
  }

  getProductDetails(id){ 
    this.productDetails = this.db.object<Product>(this.productspath + '/' + id ).snapshotChanges()
    .map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    return this.productDetails;

  }

  addProduct(_id,productDetails){
    var AddProduct = JSON.parse(JSON.stringify( productDetails )); //remotes the undefined fields

    var updates = {};
    updates['/' + this.productspath + '/' + _id] = AddProduct;
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
}

