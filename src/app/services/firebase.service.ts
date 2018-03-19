import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { OAuthService } from './oauth.service';


@Injectable()
export class FirebaseService {

  
  products : AngularFireList<Product>;
  
  favoriteProducts: Observable<any>;
  neverBuyProducts: Observable<any>;
  productDetails: Observable<any>;

  shirtsRef: any;

  productspath = 'products';

  user: Observable<firebase.User>;
  authenticated:boolean = false;

  constructor(private db: AngularFireDatabase
  ) {
    
    this.getProducts();
    this.shirtsRef = this.db;
  }

  login(){
    // this.authser.login();
    
    // console.log("login ");
    // console.log(this.af);
  }

  logout(){
    
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

  updateProduct(_id,productDetails){
    var Editproduct = JSON.parse(JSON.stringify( productDetails )); //remotes the undefined fields

    var updates = {};
    updates['/' + this.productspath + '/' + _id] = Editproduct;
    return this.db.database.ref().update(updates);
  }

  deleteProduct(_id){
    return this.db.list(this.productspath).remove(_id);
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

