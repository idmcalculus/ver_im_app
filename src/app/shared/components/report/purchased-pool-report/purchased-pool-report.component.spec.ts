import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedreportComponent } from './purchased-pool-report.component';

describe('PoolreportComponent', () => {
  let component: PurchasedreportComponent;
  let fixture: ComponentFixture<PurchasedreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
