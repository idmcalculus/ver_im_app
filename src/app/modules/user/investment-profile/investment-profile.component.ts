import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute, Router} from '@angular/router';
import { InvestmentService } from './../../investment/investment.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-investment-profile',
  templateUrl: './investment-profile.component.html',
  styleUrls: ['./investment-profile.component.scss']
})
export class InvestmentProfileComponent implements OnInit {
  pool: Investment;
  poolId = 0;
  isLoading = true;
  selectedUser: User;
  loggedInUser: User;
  userSubscription: Subscription;

  expected_return: number;
  investment_amount: number;
  period: string;
  returns: string;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private investmentService: InvestmentService,
              private authService: AppAuthService) {
                this.userSubscription = this.authService.currentUser.subscribe(userInfo => {
                  if (userInfo) {
                    this.loggedInUser = userInfo;
                  }
                });

                this.route.params.subscribe(resp => {
                  this.poolId = resp.pool_id;
                  if (!this.poolId) {
                    this.poolId = Number(this.route.snapshot.paramMap.get('id'));
                  }
                  this.fetchPool(String(this.poolId));
                });
               }

  ngOnInit() {
  }

  fetchPool(poolId: string) {
    this.isLoading = true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails => {
      if (poolDetails && poolDetails.success) {
        if (poolDetails.success.Data) {
          this.pool = poolDetails.success.Data;
          this.isLoading = false;
        } else {
          this.router.navigate(['./', {}]);
        }
      } else {
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
