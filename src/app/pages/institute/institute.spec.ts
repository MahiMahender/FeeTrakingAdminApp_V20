import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Institute } from './institute';

describe('Institute', () => {
  let component: Institute;
  let fixture: ComponentFixture<Institute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Institute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Institute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
