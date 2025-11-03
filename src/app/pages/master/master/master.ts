import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../../core/service/master';
import { MasterData } from '../../../core/model/interface/MasterData';

@Component({
  selector: 'app-master',
  imports: [FormsModule, NgFor, NgIf],
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
      ['NETBANKING', 'bi-bank'],
      ['CHEQUE', 'bi-file-earmark'],
    ]);
  }

  filterItems(filter: string) {
    this.activeFilter = filter;
    this.filteredMasterData = [...this.masterDataList];

    if (filter === 'all') {
      this.filteredMasterData = [...this.masterDataList];
    } else {
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

  saveFormData() {
    if (this.masterForm.masterId > 0) {
      this.masterService.editMasterData(this.masterForm).subscribe({
        next: (res: any) => {
          alert('The Master Data Updated');
        },
      });
    } else {
      this.masterService.saveMasterData(this.masterForm).subscribe({
        next: (res: any) => {
          alert('Master Data Saves Successfly');
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
    this.filterItems(this.activeFilter);
    this.closeForm();
  }

  deleteItem(masterId: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      debugger;
      this.masterService.deleteMasterData(masterId).subscribe({
        next: (res: any) => {
          alert('Master Data Deleted Successfully');
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
      // this.items = this.items.filter((item) => item.id !== id);
      //this.filterItems(this.activeFilter);
    }
  }
}
