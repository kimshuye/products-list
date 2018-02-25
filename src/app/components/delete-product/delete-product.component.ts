import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { FirebaseService ,Product  } from '../../services/firebase.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  id;
  productName;
  productimageUrl;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getProductDetails(this.id).subscribe(snapProduct => {
      this.productName = snapProduct.name;
      this.productimageUrl = snapProduct.imageUrl;

    });
  }

  removeProduct(){
    this.firebaseService.deleteProduct(this.id);
    this.router.navigate(['']);

  }

}
