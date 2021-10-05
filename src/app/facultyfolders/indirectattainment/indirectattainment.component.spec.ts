import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectattainmentComponent } from './indirectattainment.component';

describe('IndirectattainmentComponent', () => {
  let component: IndirectattainmentComponent;
  let fixture: ComponentFixture<IndirectattainmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndirectattainmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndirectattainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
