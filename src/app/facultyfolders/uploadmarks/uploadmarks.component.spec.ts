import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmarksComponent } from './uploadmarks.component';

describe('UploadmarksComponent', () => {
  let component: UploadmarksComponent;
  let fixture: ComponentFixture<UploadmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadmarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
