import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../core/service/master';
import { MasterData } from '../../../core/model/interface/MasterData';

@Component({
  selector: 'app-master',
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './master.html',
  styleUrl: './master.css',
})
export class Master implements OnInit {
  masterService = inject(MasterService);

  showForm = false;
  activeFilter = 'all';

  masterDataList: MasterData[] = [];
  filteredMasterData: MasterData[] = [];
  icons!: Map<string, string>;
  masterForm!: MasterData;

  constructor() {
    this.getIcons();
    this.masterForm = new MasterData();
  }

  ngOnInit(): void {
    this.getAllMasterDataList();
  }
  getAllMasterDataList() {
    this.masterService.getAllMasterData().subscribe({
      next: (res: any) => {
        this.masterDataList = res.data.filter((master: MasterData) =>
          this.icons.has(master.masterValue.toUpperCase())
        );
        this.filteredMasterData = [...this.masterDataList];
      },
    });
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
    this.masterForm = new MasterData();
  }

  closeForm() {
    this.showForm = false;
    this.masterForm = new MasterData();
  }

  editItem(item: MasterData) {
    this.showForm = true;
    this.masterForm = item;
  }

  updatePage() {
    this.getAllMasterDataList();
    this.filterItems(this.activeFilter);
    this.closeForm();
  }
  saveFormData() {
    if (this.masterForm.masterId > 0) {
      this.masterService.editMasterData(this.masterForm).subscribe({
        next: (res: any) => {
          this.updatePage();
          alert('The Master Data Updated');
        },
      });
    } else {
      this.masterService.saveMasterData(this.masterForm).subscribe({
        next: (res: any) => {
          this.updatePage();
          alert('Master Data Saves Successfly');
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
  }

  deleteItem(masterId: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      debugger;
      this.masterService.deleteMasterData(masterId).subscribe({
        next: (res: any) => {
          this.updatePage();
          alert('Master Data Deleted Successfully');
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
  }
}
