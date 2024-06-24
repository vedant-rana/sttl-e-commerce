import { Injectable } from '@angular/core';
import { ICartItem } from '../types/cartTypes';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: ICartItem[] = this.getLocalStorage() || [];
  constructor() {}

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  setLocalStorage(items: ICartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  // setLocalStorage(cart) {}

  addToCart(cartItem: ICartItem) {
    const { productId, quantity } = cartItem;

    const item = this.cartItems.find(
      (item: ICartItem) => item.productId === productId
    );

    if (item) {
      if (item.quantity > 9) {
        return;
      }
      item.quantity += quantity;
      this.setLocalStorage(this.cartItems);
    } else {
      this.cartItems.push(cartItem);
      this.setLocalStorage(this.cartItems);
    }
  }
}
