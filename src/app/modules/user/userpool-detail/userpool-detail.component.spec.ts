import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { userPoolDetailComponent } from './userpool-detail.component';

describe('userPoolDetailComponent', () => {
  let component: userPoolDetailComponent;
  let fixture: ComponentFixture<userPoolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ userPoolDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(userPoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
