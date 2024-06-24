import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
    private toaster: NgToastService
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
    payment: ['', Validators.required],
  });

  makePayment() {
    if (this.checkoutForm.valid) {
      // this.alertService.error('Please enter all fields');
      this.toaster.error({
        detail: 'ERROR',
        summary: 'Please enter all fields',
        duration: 3000,
      });
      return;
    }
    this.router.navigate(['/payment']);
  }

  cancelPayment() {
    this.router.navigate(['/']);
  }
}
