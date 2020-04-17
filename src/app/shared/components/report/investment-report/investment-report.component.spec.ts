import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolreportComponent } from './investment-report.component';

describe('PoolreportComponent', () => {
  let component: PoolreportComponent;
  let fixture: ComponentFixture<PoolreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
