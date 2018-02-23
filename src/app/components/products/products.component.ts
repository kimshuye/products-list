import { Component, OnInit } from '@angular/core';
import { FirebaseService, Product } from '../../services/firebase.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  allProducts: any;

  products:any;

  constructor(private firebaseService: FirebaseService ) {    }

  ngOnInit() {
    // this.allProducts = this.firebaseService.getProducts().valueChanges();

    // this.firebaseService.getProducts().valueChanges().subscribe(snapProducts => {
    //   this.allProducts = snapProducts;
    // });

    this.allProducts = this.firebaseService.getProducts().snapshotChanges().map(changes => {
      return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
    });

    // var query = this.firebaseService.getProducts().query.orderByKey();
    // query.once("value")
    //   .then(snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //       // key will be "ada" the first time and "alan" the second time
    //       var key = childSnapshot.key;
    //       console.log("key "+key);
    //       // childData will be the actual contents of the child
    //       var childData = childSnapshot.val();
    //       console.log("Data " + JSON.stringify(childData) );
    //   });
    // });

  }

}
