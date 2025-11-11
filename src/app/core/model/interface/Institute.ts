export class InstituteData {
  instituteId: number;
  name: string;
  conatctNo: string;
  emailId: string;
  city: string;
  pincode: string;
  state: string;
  location: string;
  ownerName: string;
  createdDate: Date;
  gstNo: string;

  constructor() {
    this.instituteId = 0;
    this.name = '';
    this.conatctNo = '';
    this.emailId = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.location = '';
    this.ownerName = '';
    this.createdDate = new Date();
    this.gstNo = '';
  }
}
