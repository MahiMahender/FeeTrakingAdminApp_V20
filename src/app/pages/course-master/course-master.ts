import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ICourse } from '../../core/model/interface/Course';
import { Institute } from '../institute/institute';
import { InstituteData } from '../../core/model/interface/Institute';
import { CourseService } from '../../core/service/Course/course-service';
import { InstituteService } from '../../core/service/institute-service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-course-master',
  imports: [ReactiveFormsModule, DatePipe, NgIf, NgFor],
  templateUrl: './course-master.html',
  styleUrl: './course-master.css',
})
export class CourseMaster {
  activeTab: 'all' | 'add' = 'all';
  courses: ICourse[] = [];
  institutes: any;
  courseForm: FormGroup;
  isEditMode = false;
  editingCourseId: number | null = null;
  showModal = false;
  loading = false;
  private modal: any;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private instituteService: InstituteService
  ) {
    this.institutes = [];
    this.courseForm = this.fb.group({
      courseId: [0],
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      courseCost: [0, [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      instituteId: [null, Validators.required],
      courseDescription: ['', [Validators.required, Validators.minLength(10)]],
      isActive: [true],
    });
  }

  ngOnInit() {
    this.loadCourses();
    this.loadInstitutes();
  }

  loadCourses() {
    this.courseService.loadAllCourses().subscribe({
      next: (res: any) => {
        this.courses = res;
      },
    });
  }

  loadInstitutes() {
    this.instituteService.getAllInstitutes().subscribe({
      next: (res: any) => {
        let instituesData = res.data;
        instituesData.map((institute: InstituteData) => {
          this.institutes.push({
            instituteId: institute.instituteId,
            name: institute.name,
          });
        });
      },
    });
  }

  setActiveTab(tab: 'all' | 'add') {
    this.activeTab = tab;
    if (tab === 'add') {
      this.openAddModal();
    }
  }

  openAddModal() {
    this.isEditMode = false;
    this.editingCourseId = null;
    this.courseForm.reset({
      course_name: '',
      course_cost: 0,
      duration: '',
      institute_id: null,
      course_description: '',
      is_active: true,
    });
    this.openModal();
  }

  openModal() {
    this.showModal = true;
    const modalEl = document.getElementById('courseModal');
    this.modal = new Modal(modalEl!);
    this.modal.show();
  }
  openEditModal(course: ICourse) {
    this.isEditMode = true;
    this.editingCourseId = course.courseId || null;
    this.courseForm.patchValue({
      courseId: course.courseId,
      courseName: course.courseName,
      courseCost: course.courseCost,
      duration: course.duration,
      instituteId: course.instituteId,
      courseDescription: course.courseDescription,
      isActive: course.isActive,
    });
    this.openModal();
    console.log(this.courseForm.value);
  }

  closeModal() {
    this.showModal = false;
    this.courseForm.reset();
    this.isEditMode = false;
    this.editingCourseId = null;
    this.activeTab = 'all';
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue: ICourse = this.courseForm.value;
    console.log(formValue);

    let courseId = formValue.courseId;
    if (courseId > 0) {
      this.courseService.updateCourse(formValue).subscribe({
        next: (res: any) => {
          this.courses = this.courses.map((course) =>
            courseId === course.courseId ? { ...formValue } : course
          );
        },
      });
    } else {
      formValue.courseId = 0;
      this.courseService.createCourse(formValue).subscribe({
        next: (res: any) => {
          this.courses.push(res.data);
        },
      });
    }
    if (this.modal) {
      this.modal.hide();
    }
    this.loading = false;
    this.closeModal();
  }

  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.loading = true;
      this.courseService.deleteCourse(courseId).subscribe({
        next: (res: any) => {
          this.courses = this.courses.filter((course) => course.courseId !== courseId);
        },
      });
    }
    this.loading = false;
  }

  getInstituteName(instituteId: number): string {
    const institute = this.institutes.find((i: any) => i.instituteId === instituteId);
    return institute ? institute.name : 'Unknown';
  }
}
