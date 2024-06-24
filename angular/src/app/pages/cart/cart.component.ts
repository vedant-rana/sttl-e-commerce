import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartRowComponent } from '../../components/cart-row/cart-row.component';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../types/cartTypes';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartRowComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: ICartItem[] = [];
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getLocalStorage();
  }

  totalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
