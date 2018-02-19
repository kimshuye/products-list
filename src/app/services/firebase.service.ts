import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class FirebaseService {

  products : Observable<any[]>;
  
  favoriteProducts: Observable<any>;

  constructor(private db: AngularFireDatabase) { }

  getProducts(){
    this.products = this.db.list<Product>('/products').valueChanges() as  Observable<any[]>;
    return this.products;
  }

  getUntagFavProducts(){
    this.favoriteProducts = this.db.list<Product>('/products').valueChanges().map(snapProducts => {
      const topRatedProducts = snapProducts.filter(item => item.rate > 0 );
      return topRatedProducts;
    });
    return this.favoriteProducts;
  }

}

interface Product{
  $sku?: string;
  $name?: string; 
  $barcode?: string;
  pirce?: string;
  imageUrl?: string;
  rate: number;

}