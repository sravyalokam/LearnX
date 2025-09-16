import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SignInPage {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin-page.html',
  styleUrls: ['./signin-page.css']
})
export class SignIn implements OnInit {
  error: string | null = null;
  showPassword = false;
  form!: FormGroup<SignInPage>;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group<SignInPage>({
      email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
      password: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 

    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    this.auth.login(email, password).subscribe({
      next: user => {

        if (user) {
          this.router.navigate(['/homepage']);
        } else {
          this.error = 'Invalid email or password.';
        }
      },
      error: () => {
        this.error = 'Unable to reach server. Please try later.';
      }
    });
  }
}
