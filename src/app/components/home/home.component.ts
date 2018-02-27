import { Component, OnInit } from '@angular/core';
import { FirebaseService , Product } from '../../services/firebase.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rateProducts : any;
  neverBuyProducts : any;

  user: Observable<firebase.User>;
  authenticated:boolean = false;

  constructor(private fs: FirebaseService
  ) { 
    this.user = this.fs.user;
    this.authenticated = this.fs.authenticated;
  }

  ngOnInit() {
    this.fs.getRateProducts().subscribe(snapProducts => {
      this.rateProducts = snapProducts;
      //console.log(this.favoriteProducts);
    });

    this.fs.getNeverBuyProducts().subscribe(snapProducts => {
      this.neverBuyProducts = snapProducts;
      //console.log('Never Products : ' , this.neverBuyProducts);
    });
  }

}
