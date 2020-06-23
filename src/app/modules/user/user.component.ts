import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserSession } from 'src/app/shared/models/UserSession';
import { User} from './../../shared/models/user';
import { AppAuthService} from './../../core/auth/auth.service';
import { Subscription } from 'rxjs';
import { InvestmentService } from './../investment/investment.service';
import { Category } from 'src/app/shared/models/Category';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userSession: UserSession;
  userProfile: User = {email: '', password: '', user_category: 'User'};
  currentUserSubscription: Subscription;
  categories: [Category];
  isUser = true;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private authService:AppAuthService,
    private investmentService:InvestmentService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
    ) {
      this.authService.setInProfileView(true);
      this.mobileQuery = media.matchMedia('(max-width: 992px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit() {
     this.authService.validateSession().then(resp => {
      if (resp.email) {
        this.authService.setUser(resp);
        this.userProfile = resp;
        this.isUser = this.userProfile.user_category === 'Admin' ? false : true;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getCategories() {
    this.investmentService.getCategories().subscribe(categories => {
      if (categories && categories.success) {
        this.categories = categories.success.Data;
      }
    });
  }

  sidebarToggle(event, hamburger = false) {
    return this.mobileQuery.matches ? event.toggle() : (hamburger === true ? event.toggle() : null);
  }
}
