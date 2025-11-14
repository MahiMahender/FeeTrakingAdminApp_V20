export interface IEnrollment {
  courseId: number;
  enrollmentDoneByUserId: number;
  enrollmentDate: string;
  finalAmount: number;
  discountGiven: number;
  discountApprovedByUserId: number;
  isFeesCompleted: boolean;
  studentName: string;
  studentContact: string;
  studentEmail: string;
  city: string;
  state: string;
  pincode: string;
  qualification: string;
  collegeName: string;
  collegeCity: string;
  familyDetails: string;
  aadharCard: string;
  profilePhotoName: string;
  refrenceById: number;
  instituteId: number;
}
