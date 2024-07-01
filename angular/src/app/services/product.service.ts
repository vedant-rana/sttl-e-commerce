import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerConstants } from '../utils/serverConstants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${ServerConstants.SERVER_URL}/products/all`);
  }

  getSingleProduct(productId: string) {
    return this.http.get(`${ServerConstants.SERVER_URL}/products/${productId}`);
  }
}
