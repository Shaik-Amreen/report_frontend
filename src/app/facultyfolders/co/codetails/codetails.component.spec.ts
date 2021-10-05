import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetailsComponent } from './codetails.component';

describe('CodetailsComponent', () => {
  let component: CodetailsComponent;
  let fixture: ComponentFixture<CodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
