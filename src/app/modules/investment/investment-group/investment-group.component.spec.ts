import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentGroupComponent } from './investment-group.component';

describe('InvestmentGroupComponent', () => {
  let component: InvestmentGroupComponent;
  let fixture: ComponentFixture<InvestmentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
