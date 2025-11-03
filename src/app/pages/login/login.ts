import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginData } from '../../core/model/interface/Login';
import { LoginService } from '../../core/service/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isLoading: boolean = false;

  loginForm: LoginData;
  loginService = inject(LoginService);
  router = inject(Router);

  constructor() {
    this.loginForm = new LoginData();
  }
  ngOnInit(): void {}

  onLogin() {
    this.loginService.getLogin(this.loginForm).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/master');
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /* onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      setTimeout(() => {
        console.log('Login:', {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        });
        this.isLoading = false;
        alert('Login successful!');
      }, 1500);
    }
  } */
}
