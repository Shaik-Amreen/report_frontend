import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopsoComponent } from './copso.component';

describe('CopsoComponent', () => {
  let component: CopsoComponent;
  let fixture: ComponentFixture<CopsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
