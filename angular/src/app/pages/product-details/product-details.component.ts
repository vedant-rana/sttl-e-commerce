import { Component } from '@angular/core';
import { ServerConstants } from '../../utils/serverConstants';
import { IProduct } from '../../types/productTypes';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

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
    private productService: ProductService
  ) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    this.productService.getSingleProduct(productId!).subscribe((res: any) => {
      this.product = res.data;
    });
  }
}
