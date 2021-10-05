import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostargetComponent } from './postarget.component';

describe('PostargetComponent', () => {
  let component: PostargetComponent;
  let fixture: ComponentFixture<PostargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
