import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  allProducts: any;

  constructor(private firebaseService: FirebaseService ) {    }

  ngOnInit() {
    // this.allProducts = this.firebaseService.getProducts().valueChanges();

    this.firebaseService.getProducts().valueChanges().subscribe(snapProducts => {
      this.allProducts = snapProducts;
    });

    // this.firebaseService.getFavProducts().map(actions => {
    //   return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    // }).subscribe(items => {
    //   return items.map(item => item.key);
    // });
  }

}
