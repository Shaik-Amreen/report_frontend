import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotargetComponent } from './cotarget.component';

describe('CotargetComponent', () => {
  let component: CotargetComponent;
  let fixture: ComponentFixture<CotargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
