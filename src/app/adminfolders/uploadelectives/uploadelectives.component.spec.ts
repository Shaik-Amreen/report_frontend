import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadelectivesComponent } from './uploadelectives.component';

describe('UploadelectivesComponent', () => {
  let component: UploadelectivesComponent;
  let fixture: ComponentFixture<UploadelectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadelectivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadelectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
