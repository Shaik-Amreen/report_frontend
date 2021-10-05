import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoclassComponent } from './coclass.component';

describe('CoclassComponent', () => {
  let component: CoclassComponent;
  let fixture: ComponentFixture<CoclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
