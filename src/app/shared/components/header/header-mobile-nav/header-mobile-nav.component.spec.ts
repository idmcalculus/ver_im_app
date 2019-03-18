import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileNavComponent } from './header-mobile-nav.component';

describe('HeaderMobileNavComponent', () => {
  let component: HeaderMobileNavComponent;
  let fixture: ComponentFixture<HeaderMobileNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMobileNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMobileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
