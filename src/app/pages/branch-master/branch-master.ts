import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IBranch } from '../../core/model/interface/Branch';
import { NgFor, NgIf } from '@angular/common';
import { BranchMasterService } from '../../core/service/Branch/branch-master-service';
import { Modal } from 'bootstrap';
import { InstituteService } from '../../core/service/institute-service';
import { InstituteData } from '../../core/model/interface/Institute';

@Component({
  selector: 'app-branch-master',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './branch-master.html',
  styleUrl: './branch-master.css',
})
export class BranchMaster implements OnInit {
  branchService = inject(BranchMasterService);
  instituteService = inject(InstituteService);

  activeView: 'all' | 'add' = 'all';
  isEditMode = false;
  editingIndex: number | null = null;
  branchForm: FormGroup;
  branches: IBranch[] = [];
  institutes: any;

  private modal: any;

  constructor(private fb: FormBuilder) {
    this.institutes = [];
    this.branchForm = this.fb.group({
      branchId: [0],
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      instituteId: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      location: ['', Validators.required],
      branchContactNo: ['', Validators.required],
      branchEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.loadAllInstitues();
    this.loadAllBranches();
    const modalElement = document.getElementById('addBranchModal');
    if (modalElement) {
      this.modal = new Modal(modalElement);
    }
  }

  loadAllInstitues() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (res: any) => {
        let instituesData = res.data;
        instituesData.map((institute: InstituteData) => {
          this.institutes.push({ id: institute.instituteId, name: institute.name });
        });
      },
    });
  }
  toggleView(view: 'all' | 'add') {
    this.activeView = view;
  }

  openAddBranchModal() {
    this.branchForm.reset({ branchId: 0 });
    if (this.modal) {
      this.modal.show();
    }
  }

  saveBranch() {
    if (this.branchForm.valid) {
      let newBranch: IBranch = this.branchForm.value;
      if (this.branchForm.get('branchId')?.value > 0) {
        this.branchService.updateBranch(newBranch).subscribe({
          next: (res: any) => {
            newBranch = res.data;
            this.branches = this.branches.map((branch) =>
              newBranch.branchId === branch.branchId ? { ...newBranch } : branch
            );
          },
        });
      } else {
        this.branchService.createBranch(newBranch).subscribe({
          next: (res: any) => {
            newBranch = res.data;
            this.branches.push(newBranch);
          },
        });
      }
      if (this.modal) {
        this.modal.hide();
      }
      this.activeView = 'all';
      this.branchForm.reset();
    } else {
      Object.keys(this.branchForm.controls).forEach((key) => {
        this.branchForm.get(key)?.markAsTouched();
      });
    }
  }

  loadAllBranches() {
    this.branchService.loadAllBranches().subscribe({
      next: (res: any) => {
        this.branches = res;
      },
    });
  }
  openEditBranchModal(index: number) {
    this.isEditMode = true;
    this.editingIndex = index;
    const branch = this.branches[index];
    this.branchForm.patchValue(branch);
    this.activeView = 'add';
    if (this.modal) {
      this.modal.show();
    }
  }

  deleteBranch(branchId: number) {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.branchService.deleteBranch(branchId).subscribe({
        next: (res: any) => {
          this.branches = this.branches.filter((branch) => branch.branchId !== branchId);
        },
      });
      //this.branches.splice(index, 1);
    }
  }
}
