import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedreportComponent } from './view-pool-report.component';

describe('PoolreportComponent', () => {
  let component: ViewedreportComponent;
  let fixture: ComponentFixture<ViewedreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewedreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
