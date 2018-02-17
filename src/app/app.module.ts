import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

//Forms
import { FormsModule } from "@angular/forms";



import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

//Routes
import { RouterModule , Routes } from '@angular/router';
const appRoutes: Routes = [
  {path: '' , component:HomeComponent}
  ,{path: 'products' , component:ProductsComponent}
  ,{path: 'product/:id' , component:ProductComponent}
  ,{path: 'add-product' , component:AddProductComponent}
  ,{path: 'edit-product/:id' , component:EditProductComponent}
  ,{path: 'delete-product/:id' , component:DeleteProductComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
