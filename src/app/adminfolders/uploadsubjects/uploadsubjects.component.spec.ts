import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsubjectsComponent } from './uploadsubjects.component';

describe('UploadsubjectsComponent', () => {
  let component: UploadsubjectsComponent;
  let fixture: ComponentFixture<UploadsubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadsubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
