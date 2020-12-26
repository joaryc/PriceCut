import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TourViewComponent } from './components/tour-view/tour-view.component';
import { OccasionListComponent } from './components/occasion-list/occasion-list.component';
import { AddTourComponent } from './components/add-tour/add-tour.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'tour-list', component: OccasionListComponent },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'addToToursList', component: AddTourComponent },
  { path: 'tour-detail-view', component: TourViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },


  { path: '',   redirectTo: '/tour-list', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component:  PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
