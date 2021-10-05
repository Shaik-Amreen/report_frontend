import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadstudentdataComponent } from './uploadstudentdata.component';

describe('UploadstudentdataComponent', () => {
  let component: UploadstudentdataComponent;
  let fixture: ComponentFixture<UploadstudentdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadstudentdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadstudentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
