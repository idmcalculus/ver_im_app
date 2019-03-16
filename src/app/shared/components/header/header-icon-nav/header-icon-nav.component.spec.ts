import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIconNavComponent } from './header-icon-nav.component';

describe('HeaderIconNavComponent', () => {
  let component: HeaderIconNavComponent;
  let fixture: ComponentFixture<HeaderIconNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderIconNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderIconNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
