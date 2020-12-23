import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './_services/in-memory-data.service';

import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { AddTourComponent } from './components/add-tour/add-tour.component';
import { CartComponent } from './components/cart/cart.component';
import { TourViewComponent } from './components/tour-view/tour-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'; // CLI imports router

import { Ng5SliderModule } from 'ng5-slider';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';





@NgModule({
  declarations: [
    AppComponent,
    TourDetailComponent,    
    AddTourComponent,
    CartComponent,
    TourViewComponent,
    PageNotFoundComponent,
    TourListComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  exports: [RouterModule],
  imports: [
    Ng5SliderModule,
    //HttpClientInMemoryWebApiModule.forRoot(
    //InMemoryDataService, { dataEncapsulation: false }
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    { path: '', component: AppModule },
    { path: 'products', component: TourViewComponent },
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [authInterceptorProviders,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
