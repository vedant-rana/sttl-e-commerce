import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toaster: NgToastService,
    private cartService: CartService
  ) {}

  checkoutForm = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', [Validators.required]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    payment: [''],
  });

  makePayment() {
    if (this.checkoutForm.invalid) {
      // this.alertService.error('Please enter all fields');
      this.toaster.error({
        detail: 'ERROR',
        summary: 'Please enter all fields',
        duration: 3000,
      });
      return;
    }

    if (String(this.checkoutForm.value.phone!).length != 10) {
      this.toaster.error({
        detail: 'ERROR',
        summary: 'Please enter valid phone number',
        duration: 3000,
      });
      return;
    }

    if (String(this.checkoutForm.value.zip!).length != 6) {
      this.toaster.error({
        detail: 'ERROR',
        summary: 'Please enter valid zip code',
        duration: 3000,
      });
      return;
    }

    if (this.checkoutForm.value.payment == '') {
      this.toaster.error({
        detail: 'ERROR',
        summary: 'Please select payment method',
        duration: 3000,
      });
      return;
    }
    // this.router.navigate(['/payment']);
    this.cartService.processCartToOrder().subscribe({
      next: (res: any) => {
        if (res.body) {
          this.cartService.clearCart();
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'Order Placed Successfully',
            duration: 3000,
          });
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.toaster.error({
          detail: 'ERROR',
          summary: 'Failed to place Order',
          duration: 3000,
        });
      },
    });
  }

  cancelPayment() {
    this.router.navigate(['/']);
  }
}
