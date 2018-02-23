import { Component, OnInit } from '@angular/core';
import { FirebaseService , Product } from '../../services/firebase.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rateProducts : any;
  neverBuyProducts : any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getRateProducts().subscribe(snapProducts => {
      this.rateProducts = snapProducts;
      //console.log(this.favoriteProducts);
    });

    this.firebaseService.getNeverBuyProducts().subscribe(snapProducts => {
      this.neverBuyProducts = snapProducts;
      //console.log('Never Products : ' , this.neverBuyProducts);
    });
  }

}
