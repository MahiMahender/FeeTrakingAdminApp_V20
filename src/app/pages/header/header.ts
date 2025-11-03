import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isCollapsed = true;

  constructor(private router: Router) {}

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isCollapsed = true;
  }

  logout() {
    console.log('Logout clicked');
    this.isCollapsed = true;
  }
}
