import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { API_Constant } from '../constant/Constant';
import { InstituteData } from '../model/interface/Institute';

@Injectable({
  providedIn: 'root',
})
export class InstituteService {
  http = inject(HttpClient);

  createInstitute(instituteData: InstituteData) {
    return this.http.post(
      environment.API_URL + API_Constant.INSTITUTE_Master.CREATE_INSTITUTE,
      instituteData
    );
  }

  getAllInstitutes() {
    return this.http.get(environment.API_URL + API_Constant.INSTITUTE_Master.GET_ALL_INSTITUTES);
  }

  getInsituteById(instituteId: number) {
    return this.http.get(
      environment.API_URL + API_Constant.INSTITUTE_Master.GET_INSTITUE_BY_ID + instituteId
    );
  }
  updateInstituteData(instituteData: InstituteData) {
    return this.http.put(
      environment.API_URL +
        API_Constant.INSTITUTE_Master.UPDATA_INSTITUTE +
        instituteData.instituteId,
      instituteData
    );
  }
  deleteInstitute(instituteId: number) {
    return this.http.delete(
      environment.API_URL + API_Constant.INSTITUTE_Master.DELETE_INSTITUTE + instituteId
    );
  }
}
