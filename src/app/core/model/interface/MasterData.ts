export class MasterData {
  masterId: number;
  masterFor: string;
  masterValue: string;
  icon?: string;

  constructor() {
    this.masterId = 0;
    this.masterFor = '';
    this.masterValue = '';
    this.icon = '';
  }
}
