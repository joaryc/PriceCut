import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { TripConfirmationComponent } from './trip-confirmation/trip-confirmation.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { AngularFireAuthGuard, canActivate, hasCustomClaim, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const adminOnly = () => hasCustomClaim('admin');

const routes: Routes = [
  {
    path: '',
    component: TripListComponent,
  },
  { path: 'login-panel', component: LoginPanelComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'signup', component: LoginPanelComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'cart', component: CartComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'new-trip', component: NewTripComponent, ...canActivate(adminOnly) },
  { path: 'trip-details/:id', component: TripDetailsComponent },
  { path: 'trip-confirmation', component: TripConfirmationComponent, canActivate: [AngularFireAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
