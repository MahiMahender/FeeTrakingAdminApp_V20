import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../core/service/master';
import { MasterData } from '../../../core/model/interface/MasterData';
import { AlertBox } from '../../../shared/alert-box/alert-box';
import { HttpErrorResponse } from '@angular/common/http';
import { Loader } from '../../../shared/loader/loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-master',
  imports: [FormsModule, NgFor, NgIf, NgClass, AlertBox, Loader],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master implements OnInit, OnDestroy {
  masterService = inject(MasterService);

  showForm = false;
  activeFilter = 'all';

  masterDataList: MasterData[] = [];
  filteredMasterData: MasterData[] = [];
  icons!: Map<string, string>;
  masterForm: MasterData;
  isEdit: Boolean;
  subscriptionList: Subscription[];

  alertMsgData = signal({ alertType: '', alertMessage: '' });
  loderData = signal({ loaderType: '' });

  constructor() {
    this.isEdit = false;
    this.getIcons();
    this.masterForm = new MasterData();
    this.subscriptionList = [];
  }

  ngOnInit(): void {
    this.getAllMasterDataList();
  }
  getAllMasterDataList() {
    this.loderData.set({ loaderType: 'content' });
    const loadMasterSub$ = this.masterService.getAllMasterData().subscribe({
      next: (res: any) => {
        this.getAllMasterDataWithIcons(res.data);
        this.loderData.set({ loaderType: '' });
      },
    });
    this.subscriptionList.push(loadMasterSub$);
  }
  getAllMasterDataWithIcons(res: MasterData[]) {
    this.masterDataList = res.filter((master: MasterData) =>
      this.icons.has(master.masterValue.toUpperCase())
    );
    this.filteredMasterData = [...this.masterDataList];
  }
  getIcons() {
    this.icons = new Map<string, string>([
      ['CASH', 'bi-cash-coin'],
      ['CARD', 'bi-credit-card'],
      ['UPI', 'bi-phone'],
      ['INVOICE', 'bi-receipt'],
      ['RECEIPT', 'bi-file-earmark-check'],
      ['VOUCHER', 'bi-ticket'],
      ['NET BANKING', 'bi-bank'],
      ['CHEQUE', 'bi-file-earmark'],
    ]);
  }

  filterItems(filter: string) {
    this.activeFilter = filter;
    this.filteredMasterData = [...this.masterDataList];
    if (filter !== 'all') {
      this.filteredMasterData = this.filteredMasterData.filter((master) => {
        return master.masterFor.toUpperCase().includes(filter.toUpperCase());
      });
    }
  }

  openForm() {
    this.showForm = true;
    this.isEdit = false;
    this.masterForm = new MasterData();
  }

  closeForm() {
    this.showForm = false;
    this.masterForm = new MasterData();
  }

  editItem(item: MasterData) {
    this.showForm = true;
    this.isEdit = true;
    this.masterForm = item;
  }

  updatePage() {
    this.filterItems(this.activeFilter);
    this.closeForm();
  }
  saveFormData() {
    this.loderData.set({ loaderType: 'button' });
    if (this.masterForm.masterId > 0) {
      const editFormSub$ = this.masterService.editMasterData(this.masterForm).subscribe({
        next: (res: any) => {
          this.loderData.set({ loaderType: '' });
          let resData = res;
          this.masterDataList = this.masterDataList.map((master) =>
            master.masterId === resData.masterId ? { ...master, ...res } : master
          );
          this.getAllMasterDataWithIcons(this.masterDataList);
          this.updatePage();
          this.alertMsg('Suceess', 'Master data Updated successfully');
        },
        error: (error: HttpErrorResponse) => {
          this.alertMsg('Error', error.error?.message);
        },
      });
      this.subscriptionList.push(editFormSub$);
    } else {
      const saveFormsub$ = this.masterService.saveMasterData(this.masterForm).subscribe({
        next: (res: any) => {
          this.loderData.set({ loaderType: '' });
          this.masterDataList.push(res.data);
          this.updatePage();
          this.alertMsg('Suceess', 'Master data Saves successfully');
        },
        error: (error: HttpErrorResponse) => {
          this.alertMsg('Error', error.error?.message);
          console.log(error);
        },
      });
      this.subscriptionList.push(saveFormsub$);
    }
  }

  deleteItem(masterId: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      const deletMasterSub$ = this.masterService.deleteMasterData(masterId).subscribe({
        next: (res: any) => {
          this.masterDataList = this.masterDataList.filter(
            (master) => master.masterId !== masterId
          );
          this.updatePage();
          this.alertMsg('Suceess', 'Master data deleted successfully');
        },
        error: (error: HttpErrorResponse) => {
          this.alertMsg('Error', error.error?.message);
        },
      });
      this.subscriptionList.push(deletMasterSub$);
    }
  }
  alertMsg(type: string, msg: string) {
    this.alertMsgData.set({
      alertType: type,
      alertMessage: msg,
    });
    setTimeout(() => {
      this.alertMsgData.set({
        alertType: '',
        alertMessage: '',
      });
    }, 5000);
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
