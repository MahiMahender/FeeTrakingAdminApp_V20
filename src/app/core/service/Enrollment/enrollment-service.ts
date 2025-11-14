import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEnrollment } from '../../model/interface/Enrollment';
import { environment } from '../../../../environments/environment';
import { API_Constant } from '../../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  http = inject(HttpClient);
  baseURL = environment.API_URL;

  createEnrollment(enrollment: IEnrollment) {
    return this.http.post(this.baseURL + API_Constant.Enrollment.CREATE_ENROLLMENT, enrollment);
  }
  loadAllEnrollmentsByInstituteId(instituteId: number) {
    return this.http.get(
      this.baseURL + API_Constant.Enrollment.GET_ALL_ENROLLMENTS_BY_INSTITUTE_ID + instituteId
    );
  }
  getEnrollmentById(enrollmentId: number) {
    return this.http.get(
      this.baseURL + API_Constant.Enrollment.GET_ENROLLMENT_BY_ID + enrollmentId
    );
  }
  UpdateEnrollment(enrollment: IEnrollment) {
    return this.http.put(this.baseURL + API_Constant.Enrollment.UPDATE_ENROLLMENT, enrollment);
  }
  DeleteEnrollment(enrollmentId: number) {
    return this.http.delete(this.baseURL + API_Constant.Enrollment + enrollmentId);
  }
}
