import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { OccasionListComponent } from './components/occasion-list/occasion-list.component';
import { AddOccasionComponent } from './components/add-occasion/add-occasion.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'occasion-list', component: OccasionListComponent },
  { path: 'favourites', component: FavouriteComponent },
  { path: 'add-occasion', component: AddOccasionComponent },
  { path: 'occasion-detail-view', component: GalleryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },


  { path: '',   redirectTo: '/occasion-list', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component:  PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
