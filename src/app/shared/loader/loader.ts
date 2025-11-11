import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [NgIf],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  @Input() loaderType: string;

  constructor() {
    this.loaderType = '';
  }
}
