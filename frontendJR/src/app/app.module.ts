import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './_services/in-memory-data.service';

import { OccasionDetailComponent } from './components/occasion-detail/occasion-detail.component';
import { AddOccasionComponent } from './components/add-occasion/add-occasion.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OccasionListComponent } from './components/occasion-list/occasion-list.component';
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
    OccasionDetailComponent,    
    AddOccasionComponent,
    FavouriteComponent,
    GalleryComponent,
    PageNotFoundComponent,
    OccasionListComponent,
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
    { path: 'products', component: GalleryComponent },
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [authInterceptorProviders,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
