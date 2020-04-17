import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserGroupComponent } from './edit-user-group.component';

describe('EditUserGroupComponent', () => {
  let component: EditUserGroupComponent;
  let fixture: ComponentFixture<EditUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
