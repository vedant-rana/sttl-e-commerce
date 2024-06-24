import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { authGuard } from './guard/auth.guard';
import { loginGuard } from './guard/login.guard';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
];
