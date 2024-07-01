import { Component } from '@angular/core';
import { ServerConstants } from '../../utils/serverConstants';
import { IProduct } from '../../types/productTypes';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ICartItem } from '../../types/cartTypes';
import { CartService } from '../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  imageServer = ServerConstants.IMAGE_SERVER;
  product: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private toaster: NgToastService
  ) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    this.productService.getSingleProduct(productId!).subscribe((res: any) => {
      this.product = res.data;
    });
  }

  addProductTocart(cartItem: ICartItem) {
    this.cartService.addToCart(cartItem);
    this.toaster.success({
      detail: 'SUCCESS',
      summary: 'Product Added to cart',
      duration: 3000,
    });
  }
}
