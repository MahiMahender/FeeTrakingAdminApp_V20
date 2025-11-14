import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMaster } from './course-master';

describe('CourseMaster', () => {
  let component: CourseMaster;
  let fixture: ComponentFixture<CourseMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
