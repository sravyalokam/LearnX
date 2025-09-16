import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  public otp: string | null = null;
  public email: string | null = null;

  setOtp(otp: string, email: string) {
    this.otp = otp;
    this.email = email;
  }

  clearOtp() {
    this.otp = null;
    this.email = null;
  }
}
