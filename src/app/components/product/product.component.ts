import { Component, OnInit } from '@angular/core';
import { FirebaseService , Product } from '../../services/firebase.service';
import { ActivatedRoute , Router } from "@angular/router";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id:any;

  constructor(private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getProductDetails(this.id).subscribe(snapProduct => {
      console.log('product detail : ' + JSON.stringify(snapProduct) );
    });
  }

}
