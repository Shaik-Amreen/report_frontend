import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentfoldersComponent } from './studentfolders.component';

describe('StudentfoldersComponent', () => {
  let component: StudentfoldersComponent;
  let fixture: ComponentFixture<StudentfoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentfoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentfoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
