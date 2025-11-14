import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ICourse } from '../../model/interface/Course';
import { API_Constant } from '../../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  http = inject(HttpClient);
  baseURL = environment.API_URL;

  createCourse(course: ICourse) {
    return this.http.post(this.baseURL + API_Constant.COURSE.CREATE_COURSE, course);
  }

  loadAllCourses() {
    return this.http.get(this.baseURL + API_Constant.COURSE.GET_ALL_COURSES);
  }

  getCourseById(courseId: number) {
    return this.http.get(this.baseURL + API_Constant.COURSE.GET_COURSE_BY_ID + courseId);
  }

  updateCourse(course: ICourse) {
    return this.http.put(this.baseURL + API_Constant.COURSE.UPDATE_COURSE, course);
  }

  deleteCourse(courseId: number) {
    return this.http.delete(this.baseURL + API_Constant.COURSE.DELETE_COURSE + courseId);
  }

  getCoursesByInstituteId(instituteId: number) {
    return this.http.get(
      this.baseURL + API_Constant.COURSE.GET_COURSE_BY_INSTITUTE_ID + instituteId
    );
  }
}
