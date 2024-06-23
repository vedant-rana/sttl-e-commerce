import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../types/productTypes';
import { RouterLink } from '@angular/router';
import { ServerConstants } from '../../utils/serverConstants';

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
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((res: any) => {
      // this.products.push(res.data!);
      this.products = res.data!;
      console.log(this.products);
    });
  }
}
