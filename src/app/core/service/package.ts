import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PackageData } from '../model/interface/Package';
import { environment } from '../../../environments/environment';
import { API_Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  http = inject(HttpClient);

  getPackeById(packageId: number) {
    return this.http.get(
      environment.API_URL + API_Constant.PACKAGE_MASTER.PACKAGE_BY_ID + packageId
    );
  }
  getAllPackges() {
    return this.http.get(environment.API_URL + API_Constant.PACKAGE_MASTER.GET_ALL_PACKAGES);
  }

  createPackage(packageData: PackageData) {
    return this.http.post(
      environment.API_URL + API_Constant.PACKAGE_MASTER.CREATE_PACKAGE,
      packageData
    );
  }
  updatePakage(packageData: PackageData) {
    return this.http.put(
      environment.API_URL + API_Constant.PACKAGE_MASTER.UPDATE_PACKAGE + packageData.packageId,
      packageData
    );
  }
  deletePackage(packageId: number) {
    return this.http.delete(
      environment.API_URL + API_Constant.PACKAGE_MASTER.DELETE_PACKAGE + packageId
    );
  }
}
