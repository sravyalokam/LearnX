import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpService } from '../../services/otp-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.html',
  styleUrls: ['./validate-otp.css']
})
export class ValidateOtp implements OnInit {
  form!: FormGroup;
  message: string | null = null;
  otpFromForgetPassword: string | null = null;
  email: string | null = null;

  constructor(private fb: FormBuilder, private otpService: OtpService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    // Retrieve OTP and email from service
    this.otpFromForgetPassword = this.otpService.otp;
    this.email = this.otpService.email;
  }

  verifyOtp(): void {
    if (this.form.value.otp === this.otpFromForgetPassword) {
      this.message = '✅ OTP verified successfully!';

      // Clear OTP from service for security
      this.otpService.clearOtp();
    } else {
      this.message = '❌ Invalid OTP. Please try again.';
    }
  }
}
