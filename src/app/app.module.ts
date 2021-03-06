import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { MouseWheelDirective } from './mouseWheelDirective/mousewheel.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


//Forms
import { FormsModule } from "@angular/forms";

//Material design modules
import {  
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,

 } from '@angular/material';

//Routes
import { RouterModule , Routes } from '@angular/router';
const appRoutes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'}
  ,{path: 'home' , component:HomeComponent}
  ,{path: 'products' , component:ProductsComponent}
  ,{path: 'product/:id' , component:ProductComponent}
  ,{path: 'add-product' , component:AddProductComponent}
  ,{path: 'edit-product/:id' , component:EditProductComponent}
  ,{path: 'delete-product/:id' , component:DeleteProductComponent}
  ,{path:'login',component:LoginComponent}

];

// firebase configuration
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


//services
import { FirebaseService } from './services/firebase.service';
// Oauth
import { OAuthService } from './services/oauth.service';
// auth
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    NavbarComponent,
    FooterComponent,

    MouseWheelDirective,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase,'product-list-app'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],

  exports:[
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MouseWheelDirective,

  ],

  providers: [FirebaseService,AuthService,OAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
