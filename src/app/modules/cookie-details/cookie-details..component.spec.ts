import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { cookieDetailsComponent } from './cookie-details.component';

describe('AboutUsComponent', () => {
  let component:cookieDetailsComponent;
  let fixture: ComponentFixture<cookieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ cookieDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(cookieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
