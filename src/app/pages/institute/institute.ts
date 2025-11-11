import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstituteData } from '../../core/model/interface/Institute';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { InstituteService } from '../../core/service/institute-service';

@Component({
  selector: 'app-institute',
  imports: [DatePipe, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './institute.html',
  styleUrl: './institute.css',
})
export class Institute {
  instituteForm!: FormGroup;
  institutes: InstituteData[];
  showForm: boolean = false;
  showList: boolean = true;
  isEditMode: boolean = false;
  editingId: number | null = null;

  instituteService: InstituteService = inject(InstituteService);

  constructor(private fb: FormBuilder) {
    this.institutes = [];
  }

  ngOnInit() {
    this.initializeForm();
    this.loadInstituteMasterData();
  }

  loadInstituteMasterData() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (res: any) => {
        this.institutes = res.data;
      },
    });
  }

  initializeForm() {
    this.instituteForm = this.fb.group({
      instituteId: [0],
      name: ['', [Validators.required, Validators.minLength(3)]],
      conatctNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      emailId: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      state: ['', Validators.required],
      location: ['', Validators.required],
      ownerName: ['', Validators.required],
      createdDate: [new Date()],
      gstNo: [
        '',
        [
          Validators.required,
          /* Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/), */
        ],
      ],
    });
  }

  toggleView(view: 'form' | 'list') {
    if (view === 'form') {
      this.showForm = true;
      this.showList = false;
    } else {
      this.showForm = false;
      this.showList = true;
    }
  }

  onSubmit() {
    if (this.instituteForm.valid) {
      const formValue = this.instituteForm.value;
      //debugger;
      console.log(formValue);

      if (this.isEditMode && formValue.instituteId > 0) {
        this.instituteService.updateInstituteData(formValue).subscribe({
          next: (res: any) => {
            const index = this.institutes.findIndex((i) => i.instituteId === this.editingId);
            if (index !== -1) {
              this.institutes[index] = { ...formValue };
            }
            this.isEditMode = false;
            this.editingId = null;
          },
        });
      } else {
        this.instituteService.createInstitute(formValue).subscribe({
          next: (res: any) => {
            this.institutes.push(res.institute);
          },
        });
      }
      this.instituteForm.reset();
      this.initializeForm();
      this.toggleView('list');
    } else {
      Object.keys(this.instituteForm.controls).forEach((key) => {
        this.instituteForm.get(key)?.markAsTouched();
      });
    }
  }

  editInstitute(institute: InstituteData) {
    this.isEditMode = true;
    this.editingId = institute.instituteId;
    this.instituteForm.patchValue(institute);
    this.toggleView('form');
  }

  deleteInstitute(instituteId: number) {
    if (confirm('Are you sure you want to delete this institute?')) {
      this.instituteService.deleteInstitute(instituteId).subscribe({
        next: (res: any) => {
          this.institutes = this.institutes.filter(
            (institute) => institute.instituteId !== instituteId
          );
        },
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingId = null;
    this.instituteForm.reset();
    this.initializeForm();
    this.toggleView('list');
  }

  getFormControl(name: string) {
    return this.instituteForm.get(name);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.instituteForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
