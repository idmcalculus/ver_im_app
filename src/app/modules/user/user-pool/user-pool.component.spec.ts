import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { userPoolsComponent } from './user-pool.component';

describe('userPoolsComponent', () => {
  let component: userPoolsComponent;
  let fixture: ComponentFixture<userPoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ userPoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(userPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
