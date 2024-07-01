import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private fb: FormBuilder, private toaster: NgToastService) {}

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  submitDetails() {
    if (this.contactForm.invalid) {
      if (this.contactForm.get('email')?.hasError('email')) {
        this.toaster.error({
          detail: 'ERROR',
          summary: 'Please enter a valid email',
          duration: 2000,
        });
      } else {
        this.toaster.error({
          detail: 'ERROR',
          summary: 'Please fill all the fields',
          duration: 2000,
        });
      }
      return;
    }
    this.toaster.success({
      detail: 'SUCCESS',
      summary: 'We have Recieved Message successfully',
      duration: 2000,
    });
    this.contactForm.reset();
  }
}
