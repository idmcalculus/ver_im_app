import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerApplicationComponent } from './career-application.component';

describe('CareerApplicationComponent', () => {
  let component: CareerApplicationComponent;
  let fixture: ComponentFixture<CareerApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
