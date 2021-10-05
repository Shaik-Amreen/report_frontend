import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoquesComponent } from './coques.component';

describe('CoquesComponent', () => {
  let component: CoquesComponent;
  let fixture: ComponentFixture<CoquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
