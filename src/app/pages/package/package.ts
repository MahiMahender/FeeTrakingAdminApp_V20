import { Component } from '@angular/core';
import { PackageService } from '../../core/service/package';
import { FormsModule } from '@angular/forms';
import { PackageData } from '../../core/model/interface/Package';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-package',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './package.html',
  styleUrl: './package.css',
})
export class Package {
  packages: PackageData[] = [];
  currentPackage!: PackageData;
  isFormVisible = false;
  isEditMode = false;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getAllPackges().subscribe({
      next: (res: any) => {
        this.packages = res.data;
        console.log(res);
      },
    });
  }

  showAddForm(): void {
    this.isFormVisible = true;
    this.isEditMode = false;
    this.currentPackage = new PackageData();
  }

  editPackage(packageData: PackageData): void {
    this.isFormVisible = true;
    this.isEditMode = true;
    this.currentPackage = { ...packageData };
  }

  savePackage(): void {
    if (this.isEditMode && this.currentPackage.packageId > 0) {
      this.packageService.updatePakage(this.currentPackage).subscribe({
        next: (res: any) => {
          alert('Package Data Updated Succesfully');
          this.loadPackages();
          this.cancelForm();
        },
      });
    } else {
      this.packageService.createPackage(this.currentPackage).subscribe({
        next: (res: any) => {
          alert('Package Data Saved Succesfully');
          this.loadPackages();
          this.cancelForm();
        },
      });
    }
  }

  deletePackage(packageId: number): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.packageService.deletePackage(packageId).subscribe({
        next: (res: any) => {
          alert('Packege Deleted Successfully');
          this.loadPackages();
        },
      });
    }
  }

  cancelForm(): void {
    this.isFormVisible = false;
    this.currentPackage = new PackageData();
  }
}
