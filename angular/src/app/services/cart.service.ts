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

  updateItemQuantity(productId: string, quantity: number) {
    const item = this.cartItems.find(
      (item: ICartItem) => item.productId === productId
    );

    if (item) {
      item.quantity = quantity;
      this.setLocalStorage(this.cartItems);
    }
  }

  removeItemFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(
      (item: ICartItem) => item.productId !== productId
    );
    this.setLocalStorage(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.setLocalStorage(this.cartItems);
  }
}
