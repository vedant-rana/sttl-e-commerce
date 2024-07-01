import { EventEmitter, Injectable } from '@angular/core';
import { ICartItem } from '../types/cartTypes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerConstants } from '../utils/serverConstants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: ICartItem[] = this.getLocalStorage() || [];
  isCartItemsChanges = new EventEmitter();

  constructor(private http: HttpClient, private userService: UserService) {}

  getLocalStorage(): ICartItem[] {
    return JSON.parse((localStorage.getItem('cart') as string) || '[]');
  }

  setLocalStorage(items: ICartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  // setLocalStorage(cart) {}

  addToCart(cartItem: ICartItem) {
    if (this.userService.isThereCookie()) {
      this.syncCartWithBackend(cartItem);
    } else {
      const { productId, quantity } = cartItem;

      const item = this.cartItems.find(
        (item: ICartItem) => item.productId === productId
      );

      if (!item) {
        //   if (item.quantity > 9) {
        //     return;
        //   }
        //   item.quantity += quantity;
        //   this.setLocalStorage(this.cartItems);
        // } else {
        this.cartItems.push(cartItem);
        this.setLocalStorage(this.cartItems);
      }
    }
    this.isCartItemsChanges.emit(this.cartItems);
  }

  updateItemQuantity(productId: string, quantity: number) {
    if (this.userService.isThereCookie()) {
      this.manageQuantityInDB(productId, quantity).subscribe({
        next: (data) => {
          if (data) {
            const item = this.cartItems.find(
              (item: ICartItem) => item.productId === productId
            );
            if (item) {
              item.quantity = quantity;
              this.setLocalStorage(this.cartItems);
            }
          }
        },
      });
    } else {
      const item = this.cartItems.find(
        (item: ICartItem) => item.productId === productId
      );
      if (item) {
        item.quantity = quantity;
        this.setLocalStorage(this.cartItems);
      }
    }
  }

  removeItemFromCart(productId: string) {
    if (this.userService.isThereCookie()) {
      this.removeCartItemInDB(productId).subscribe({
        next: (data: any) => {
          if (data.body) {
            // console.log(productId);
            // this.cartItems = this.cartItems.filter(
            //   (item: ICartItem) => item.productId !== productId
            // );
            // console.log(this.cartItems);
            this.setLocalStorage(data.body.data.items);
            this.isCartItemsChanges.emit(data.body.data.items);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.cartItems = this.cartItems.filter(
        (item: ICartItem) => item.productId !== productId
      );
      this.setLocalStorage(this.cartItems);
      this.isCartItemsChanges.emit(this.cartItems);
    }
  }

  // removeItemFromCart(productId: string) {
  //   if (this.userService.isThereCookie()) {
  //     this.removeCartItemInDB(productId).subscribe({
  //       next: (data: any) => {
  //         if (data) {
  //           console.log('Data from DB:', data.body);
  //           this.cartItems = this.cartItems.filter((item: ICartItem) => {
  //             console.log('productid : ' + item.productId);
  //             if (item.productId === productId) {
  //               console.log('same product to remove : ' + item);
  //               return false;
  //             }
  //             return true;
  //           });
  //           console.log('Filtered cartItems:', this.cartItems);
  //           this.setLocalStorage(this.cartItems);
  //           console.log('Updated Local Storage:', this.getLocalStorage());
  //           this.isCartItemsChanges.emit(this.cartItems);
  //         }
  //       },
  //       error: (err) => {
  //         console.log('Error:', err);
  //       },
  //     });
  //   } else {
  //     this.cartItems = this.cartItems.filter(
  //       (item: ICartItem) => item.productId !== productId
  //     );
  //     console.log('Filtered cartItems:', this.cartItems);
  //     this.setLocalStorage(this.cartItems);
  //     console.log('Updated Local Storage:', this.getLocalStorage());
  //     this.isCartItemsChanges.emit(this.cartItems);
  //   }
  // }

  clearCart() {
    this.cartItems = [];
    this.setLocalStorage(this.cartItems);
    this.isCartItemsChanges.emit(this.cartItems);
  }

  syncCartWithBackend(cartItem?: ICartItem) {
    const cartProducts: ICartItem[] = cartItem
      ? [cartItem]
      : this.getLocalStorage();

    this.http
      .post(
        `${ServerConstants.SERVER_URL}/cart/sync`,
        { items: cartProducts },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          observe: 'response',
          withCredentials: true,
        }
      )
      .subscribe({
        next: (res: any) => {
          const resData = res.body.data.items;
          this.setLocalStorage(resData);
          this.isCartItemsChanges.emit(resData);
        },
        error: (err) => {
          console.log(err);
        },
      });

    // return response;
  }

  manageQuantityInDB(productId: string, quantity: number) {
    return this.http.put(
      `${ServerConstants.SERVER_URL}/cart/item`,
      { productId, quantity },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  removeCartItemInDB(productId: string) {
    return this.http.delete(
      `${ServerConstants.SERVER_URL}/cart/item/${productId}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  processCartToOrder() {
    return this.http.get(`${ServerConstants.SERVER_URL}/cart/process`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
      withCredentials: true,
    });
  }
}
