import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  favoriteProducts : any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getUntagFavProducts().subscribe(snapProducts => {
      this.favoriteProducts = snapProducts;
      console.log(this.favoriteProducts);
    });
  }

}
