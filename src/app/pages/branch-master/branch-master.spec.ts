import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchMaster } from './branch-master';

describe('BranchMaster', () => {
  let component: BranchMaster;
  let fixture: ComponentFixture<BranchMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
