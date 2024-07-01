import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../types/cartTypes';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private toaster: NgToastService
  ) {}
  // variable to store the users login status
  isLoggedIn: boolean = false;

  // cart items count
  cartItemsCount: number = 0;

  ngOnInit(): void {
    //setting the value as user login staus
    this.isLoggedIn = this.userService.isThereCookie();
    this.userService.userLoggedIn.subscribe((result) => {
      this.isLoggedIn = result;
    });
    this.cartItemsCount = this.cartService.cartItems.length;
    this.cartService.isCartItemsChanges.subscribe((data: ICartItem[]) => {
      this.cartItemsCount = data?.length;
    });
  }

  /**
   * @purpose to logout user through service
   * @params none
   * @return void
   */
  logOutUser() {
    this.userService.logoutUser().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        // emitting the user login status as false
        this.userService.userLoggedIn.emit(false);

        //clearing the cart local Storage
        this.cartService.clearCart();

        //toaster to give success message to user
        this.toaster.success({
          detail: 'SUCCESS',
          summary: 'User logged out successfully',
          duration: 3000,
        });
      },
      error: (err) => {
        // toaster to give error message to user if any error occurs
        this.toaster.error({
          detail: 'ERROR',
          summary: 'Failed to log out',
          duration: 3000,
        });
      },
    });
  }
}
