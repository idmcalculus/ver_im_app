import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { exportUserPoolComponent } from './view-customer-export.component';

describe('exportUserPoolComponent', () => {
  let component: exportUserPoolComponent;
  let fixture: ComponentFixture<exportUserPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ exportUserPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(exportUserPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
