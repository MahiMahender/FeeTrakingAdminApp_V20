import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEnrollment } from '../../core/model/interface/Enrollment';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { EnrollmentService } from '../../core/service/Enrollment/enrollment-service';
import { CourseService } from '../../core/service/Course/course-service';
import { MasterService } from '../../core/service/master';
import { ICourse } from '../../core/model/interface/Course';
import { InstituteService } from '../../core/service/institute-service';
import { InstituteData } from '../../core/model/interface/Institute';
import { Master } from '../master/master/master';
import { MasterData } from '../../core/model/interface/MasterData';

@Component({
  selector: 'app-enrollment',
  imports: [ReactiveFormsModule, DatePipe, NgIf, NgFor],
  templateUrl: './enrollment.html',
  styleUrl: './enrollment.css',
})
export class Enrollment implements OnInit {
  activeTab: 'all' | 'add' = 'all';
  enrollmentForm!: FormGroup;
  enrollments: IEnrollment[] = [];
  editingIndex: number | null = null;
  showModal = false;
  instituteId = 14;

  enrollmentService = inject(EnrollmentService);
  instituteService = inject(InstituteService);
  courseService = inject(CourseService);
  masterService = inject(MasterService);
  courses: { id: number; name: string }[] = [];

  institutes: { id: number; name: string }[] = [];

  references: { id: number; name: string }[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.loadAllEnrollmentsByInstituteId(this.instituteId);
    //this.loadAllCourses();
    this.loadAllCoursesByInstituteId(this.instituteId);
    this.loadAllInstitutes();
    this.loadAllMastersByReference();
  }

  initForm() {
    this.enrollmentForm = this.fb.group({
      //enrollmentId: [0],
      courseId: [0, Validators.required],
      enrollmentDoneByUserId: [0],
      enrollmentDate: [new Date().toISOString().split('T')[0], Validators.required],
      finalAmount: [0, [Validators.required, Validators.min(0)]],
      discountGiven: [0, [Validators.min(0)]],
      discountApprovedByUserId: [0],
      isFeesCompleted: [false],
      name: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      qualification: ['', Validators.required],
      collegeName: ['', Validators.required],
      collegeCity: ['', Validators.required],
      familyDetails: [''],
      aadharCard: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      profilePhotoName: [''],
      refrenceById: [0, Validators.required],
      instituteId: [0, Validators.required],
    });
  }

  loadAllEnrollmentsByInstituteId(instituteId: number) {
    this.enrollmentService.loadAllEnrollmentsByInstituteId(instituteId).subscribe({
      next: (res: any) => {
        this.enrollments = res.data;
      },
    });
  }

  loadAllCourses() {
    this.courseService.loadAllCourses().subscribe({
      next: (res: any) => {
        let courseData = res;
        courseData.map((course: ICourse) => {
          this.courses.push({ id: course.courseId, name: course.courseName });
        });
      },
    });
  }

  loadAllInstitutes() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (res: any) => {
        let institutes = res.data;
        institutes.map((institute: InstituteData) => {
          this.institutes.push({ id: institute.instituteId, name: institute.name });
        });
      },
    });
  }
  getInstituteById(instituteId: number) {
    this.instituteService.getInsituteById(instituteId).subscribe({
      next: (res: any) => {
        let institutes = res.data;
        institutes.map((institute: InstituteData) => {
          this.institutes.push({ id: institute.instituteId, name: institute.name });
        });
      },
    });
  }

  loadAllMastersByReference() {
    this.masterService.getAllMasterData().subscribe({
      next: (res: any) => {
        let mastersData = res.data;
        mastersData.map((master: MasterData) => {
          if (master.masterFor.toUpperCase().includes('REFRENCE'))
            this.references.push({ id: master.masterId, name: master.masterValue });
        });
      },
    });
  }
  loadAllCoursesByInstituteId(instituteId: number) {
    this.courseService.getCoursesByInstituteId(instituteId).subscribe({
      next: (res: any) => {
        let courseData = res;
        courseData.map((course: ICourse) => {
          this.courses.push({ id: course.courseId, name: course.courseName });
        });
      },
    });
  }

  getStudentDataBasedOnEntrollmentId(entrollmentId: number) {}
  setActiveTab(tab: 'all' | 'add') {
    this.activeTab = tab;
    if (tab === 'add') {
      this.openModal();
    }
  }

  openModal(enrollment?: IEnrollment, index?: number) {
    this.showModal = true;
    /* if (enrollment && index !== undefined) {
      this.editingIndex = index;
      this.enrollmentForm.patchValue({
        ...enrollment,
        enrollmentDate: new Date(enrollment.enrollmentDate).toISOString().split('T')[0],
      });
    } else {
      this.editingIndex = null;
      this.enrollmentForm.reset({
        courseId: 0,
        enrollmentDoneByUserId: 0,
        enrollmentDate: new Date().toISOString().split('T')[0],
        finalAmount: 0,
        discountGiven: 0,
        discountApprovedByUserId: 0,
        isFeesCompleted: false,
        name: '',
        contactNo: '',
        email: '',
        city: '',
        state: '',
        pincode: '',
        qualification: '',
        collegeName: '',
        collegeCity: '',
        familyDetails: '',
        aadharCard: '',
        profilePhotoName: '',
        refrenceById: 0,
        instituteId: 0,
      });
    } */
  }

  closeModal() {
    this.showModal = false;
    this.editingIndex = null;
    this.enrollmentForm.reset();
  }

  onSubmit() {
    debugger;
    if (this.enrollmentForm.valid) {
      const formValue = this.enrollmentForm.value;
      if (formValue.enrollmentId > 0) {
      } else {
        //formValue.enrollmentId = 0;
        //formValue.enrollmentDate = '';
        console.log(formValue);
        this.enrollmentService.createEnrollment(formValue).subscribe({
          next: (res: any) => {
            console.log(res);
            let newEnrollment = res.data;
            this.enrollments.push(newEnrollment);
          },
        });
      }
      /* const enrollment = {
        ...formValue,
        enrollmentDate: new Date(formValue.enrollmentDate).toISOString(),
      };

      if (this.editingIndex !== null) {
        this.enrollments[this.editingIndex] = enrollment;
      } else {
        this.enrollments.push(enrollment);
      } */

      this.closeModal();
      this.activeTab = 'all';
    }
  }

  editEnrollment(enrollment: IEnrollment, index: number) {
    this.openModal(enrollment, index);
  }

  deleteEnrollment(index: number) {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.enrollments.splice(index, 1);
    }
  }

  getCourseName(courseId: number): string {
    return this.courses.find((course: any) => course.id === courseId)?.name || 'Unknown';
  }

  getInstituteName(instituteId: number): string {
    return (
      this.institutes.find((institute: any) => institute.id === instituteId)?.name || 'Unknown'
    );
  }

  getReferenceName(referenceId: number): string {
    return (
      this.references.find((reference: any) => reference.id === referenceId)?.name || 'Unknown'
    );
  }

  getPlaceholderImage(): string {
    return 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400';
  }
}
