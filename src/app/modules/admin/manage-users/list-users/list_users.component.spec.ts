import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< Updated upstream:src/app/modules/admin/manage-users/list-users/list_users.component.spec.ts
import { ManageUsersComponent } from './list_users.component';
=======
import { ManageUsersComponent } from './view_customer.component';
>>>>>>> Stashed changes:src/app/modules/admin/manage-customer/view-customer/view_customer.component.spec.ts

describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
