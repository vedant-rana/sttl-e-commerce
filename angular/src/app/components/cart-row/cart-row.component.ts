import { Component, Input } from '@angular/core';
import { ICartItem } from '../../types/cartTypes';
import { ServerConstants } from '../../utils/serverConstants';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart-row',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './cart-row.component.html',
  styleUrl: './cart-row.component.css',
})
export class CartRowComponent {
  @Input() cartItem: ICartItem | undefined;
  imageServer = ServerConstants.IMAGE_SERVER;
  quant: number = 1;

  constructor(
    private cartService: CartService,
    private toaster: NgToastService
  ) {}

  ngOnInit() {
    this.quant = this.cartItem?.quantity!;
    console.log(this.cartItem);
  }

  handleIncrement() {
    if (this.quant < 10) {
      this.quant++;
      this.cartService.updateItemQuantity(
        this.cartItem?.productId!,
        this.quant
      );
    }
  }
  handleDecrement() {
    if (this.quant > 1) {
      this.quant--;
      this.cartService.updateItemQuantity(
        this.cartItem?.productId!,
        this.quant
      );
    }
  }

  removeFromCart() {
    this.cartService.removeItemFromCart(this.cartItem?.productId!);
    this.cartItem = undefined;
    this.toaster.success({
      detail: 'SUCCESS',
      summary: 'Item removed from cart',
      duration: 3000,
    });
  }
}
