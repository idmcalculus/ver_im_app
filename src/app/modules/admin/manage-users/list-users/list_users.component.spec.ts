import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/modules/admin/manage-admin/manage-admin.component.spec.ts
import { ManageAdminComponent } from './manage-admin.component';
=======
import { ManageUsersComponent } from './list_users.component';
>>>>>>> created add new user component to admin:src/app/modules/admin/manage-users/list-users/list_users.component.spec.ts

describe('ManageAdminComponent', () => {
  let component: ManageAdminComponent;
  let fixture: ComponentFixture<ManageAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
