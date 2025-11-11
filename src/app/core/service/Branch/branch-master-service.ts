import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_Response } from '../../model/API/API_Responese';
import { environment } from '../../../../environments/environment';
import { API_Constant } from '../../constant/Constant';
import { IBranch } from '../../model/interface/Branch';

@Injectable({
  providedIn: 'root',
})
export class BranchMasterService {
  http = inject(HttpClient);
  baseURL: string = environment.API_URL;

  createBranch(branch: IBranch) {
    return this.http.post(this.baseURL + API_Constant.BRANCH.CREATE_BRANCH, branch);
  }

  loadAllBranches() {
    return this.http.get(this.baseURL + API_Constant.BRANCH.GET_ALL_BRANCHES);
  }

  getBranchById(branchId: number) {
    return this.http.get(this.baseURL + API_Constant.BRANCH.GET_BRANCH_BY_ID + branchId);
  }

  updateBranch(branch: IBranch) {
    return this.http.put(this.baseURL + API_Constant.BRANCH.UPDATE_BRANCH, branch);
  }

  deleteBranch(branchId: number) {
    return this.http.delete(this.baseURL + API_Constant.BRANCH.DELETE_BRANCH + branchId);
  }
}
