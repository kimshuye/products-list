import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class FirebaseService {

  products : Observable<any[]>;
  allProducts: any;

  constructor(private db: AngularFireDatabase) { }

  getProducts(){
    this.products = this.db.list('/products').valueChanges();
    return this.products;
  }

}
