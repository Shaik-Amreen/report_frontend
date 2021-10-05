import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultynavbarComponent } from './facultynavbar.component';

describe('FacultynavbarComponent', () => {
  let component: FacultynavbarComponent;
  let fixture: ComponentFixture<FacultynavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultynavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultynavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
