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
    this.firebaseService.getProducts().subscribe(snapProducts => {
      this.allProducts = snapProducts;
    });
  }

}
