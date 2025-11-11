import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  imports: [NgClass],
  templateUrl: './alert-box.html',
  styleUrl: './alert-box.css',
})
export class AlertBox {
  @Input() alertType: string;
  @Input() alertMessage: string;

  constructor() {
    this.alertType = '';
    this.alertMessage = '';
  }
}
