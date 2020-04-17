import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewUserPoolComponent } from './view-customer-report.component';

describe('viewUserPoolComponent', () => {
  let component: viewUserPoolComponent;
  let fixture: ComponentFixture<viewUserPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewUserPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewUserPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
