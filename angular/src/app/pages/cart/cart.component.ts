import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartRowComponent } from '../../components/cart-row/cart-row.component';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../types/cartTypes';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartRowComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: ICartItem[] = this.cartService.cartItems;
  constructor(private cartService: CartService) {}

  totalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
