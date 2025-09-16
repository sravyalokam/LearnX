import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.css']
})
export class ForgetPassword implements OnInit {
  form!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
   otp: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.form.get('email');
  }

  sendEmail(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

     this.otp = this.generateOTP();

    const templateParams = {
      to_email: this.form.value.email,
      otp: this.otp, 
    };

    emailjs.send(
      'service_bf9iepq',     
      'template_nvhrqwf',   
      templateParams,
      'mtHaMyE3X7KJZAgdJ'   
    ).then(() => {
      this.successMessage = `An OTP has been sent to ${this.form.value.email}.`;
      setTimeout(() => {
      this.router.navigate(['/validate-otp']);
    }, 3000);
  }).catch((error) => {
    console.error('FAILED...', error);
    this.errorMessage = 'Failed to send reset link. Please try again later.';
  });
  }

  generateOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  return otp.toString();
  }
}
