export class PackageData {
  packageId: number;
  packageName: string;
  oneTimeTotalCost: number;
  emiTotalCost: string;
  maxBranches: number;
  maxStudents: number;
  isSmsAlert: boolean;

  constructor() {
    this.packageId = 0;
    this.packageName = '';
    this.oneTimeTotalCost = 0;
    this.emiTotalCost = '';
    this.maxBranches = 0;
    this.maxStudents = 0;
    this.isSmsAlert = false;
  }
}
