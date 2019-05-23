import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInvestmentComponent } from './manage-investment.component';

describe('ManageInvestmentComponent', () => {
  let component: ManageInvestmentComponent;
  let fixture: ComponentFixture<ManageInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
