import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../types/productTypes';
import { RouterLink } from '@angular/router';
import { ServerConstants } from '../../utils/serverConstants';
import { ICartItem } from '../../types/cartTypes';
import { CartService } from '../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: IProduct[] = [];
  imageServer = ServerConstants.IMAGE_SERVER;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toaster: NgToastService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res: any) => {
      // this.products.push(res.data!);
      this.products = res.data!;
      console.log(this.products);
    });
  }

  addProductTocard(cartItem: ICartItem) {
    console.log(cartItem);
    this.cartService.addToCart(cartItem);
    this.toaster.success({
      detail: 'SUCCESS',
      summary: 'Product Added to cart',
      duration: 3000,
    });
  }
}
