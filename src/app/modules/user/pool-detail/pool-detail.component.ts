import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { ActivatedRoute, Router} from '@angular/router';
import {InvestmentService} from './../../investment/investment.service';
import { Report } from 'src/app/shared/models/Report';
import { ReportService } from 'src/app/shared/components/report/report.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { Category } from 'src/app/shared/models/Category';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.scss']
})
export class PoolDetailComponent implements OnInit {
  pool: any;
  poolArray: any[] = [];
  poolId = 0;
  url: any;
  res: Category;
  reportData: Report = {title: '', description: ''};
  categories = [];
  modaltitle = 'Update Plan';
  modalButtonTitle = '';
  modalData: Report = {};
  buttonText = 'Update';
  callBack: any;
  isLoading = true;
  selectedUser: User;
  loggedInUser: User;
  userSubscription: Subscription;
  image: any;
  roi: string;
  returns: string;
  pageValue = 5;
  p2 = 1;
  reports: any[];
  // @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private investmentService: InvestmentService,
    private reportService: ReportService,
    private authService: AppAuthService,
    private cloudinaryService: CloudinaryService
    ) {
      this.getCategories();
      this.userSubscription = this.authService.currentUser.subscribe(userInfo => {
        if (userInfo) {
          this.loggedInUser = userInfo;
        }
        this.isLoading = false;
      });

      this.route.params.subscribe(resp => {
        this.poolId = resp.pool_id;
        if (!this.poolId) {
          this.poolId = Number(this.route.snapshot.paramMap.get('id'));
        }
        this.fetchPool(String(this.poolId));
      });
  }

  ngOnInit() {}

  fetchPool(poolId: string) {
    this.isLoading = true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails => {
      if (poolDetails && poolDetails.success) {
        if (poolDetails.success.Data) {
          this.pool = poolDetails.success.Data;
          this.poolArray.push(poolDetails.success.Data);

          this.roi = this.pool.investment.estimated_percentage_profit;
          this.reports = this.pool.report.sort((a, b) => (a.created_at > b.created_at) ? 1 :
          (a.created_at === b.created_at) ? ((a.id > b.id) ? 1 : -1) : -1);
          this.reports.forEach((report: any, i) => report.index = i + 1);
          this.isLoading = false;

        } else {
          this.router.navigate(['./', {}]);
        }
      }
    });
  }

  updatePool(poolId: string) {
    this.isLoading = true;
    this.investmentService.getInvestment(poolId).subscribe(poolDetails => {
      if (poolDetails && poolDetails.success) {
        if (poolDetails.success.Data) {
          this.pool = poolDetails.success.Data;
          this.isLoading = false;
        } else {
          this.router.navigate(['./', {}]);
        }
      }
    });
  }

  getCategories() {
    this.isLoading = true;
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id) {
    if (id) {
    this.res = this.categories.find(r => r.id === id);
    return this.res.category_name;
    } else {
      return this.res = {category_name: ''};
    }
  }

  addReport(filledReport: Report) {
    this.isLoading = true;
    this.reportData = filledReport;
    if (this.reportData.title) {
      if (!this.reportData.returned_amount) {
        this.reportData.returned_amount = 0;
        this.reportData.payment_type = 'Debit';
      }
      this.reportService.createReport(this.reportData).subscribe(resp => {
        if (resp && resp.success) {
          // alert(resp.success.Message)
          window.location.href = 'admin/pools/' + this.poolId;
          // this.closeBtn.nativeElement.click();
        }
        this.isLoading = false;
      });
    }
  }

  setItemsPerPage(event) {
    this.pageValue = event;
  }

  updateReport(filledReport: Report) {
    this.isLoading = true;
    this.reportData = filledReport;
    if (this.reportData.title) {
      if (!this.reportData.returned_amount) {
        this.reportData.returned_amount = 0;
        this.reportData.payment_type = 'Debit';
      }
      this.reportService.updateReport(this.reportData).subscribe(resp => {
          if (resp && resp.success) {
            // alert(resp.success.Message)
            window.location.href = 'admin/pools/' + this.poolId;
            // this.closeBtn.nativeElement.click();
          }
          this.isLoading = false;
      });
    }
  }

  updateInvestment() {
    this.buttonText = 'Updating...'
    this.pool.investment.estimated_percentage_profit = this.roi;
    this.investmentService.updateInvestment(this.pool.investment).subscribe(resp => {
      if (resp && resp.success) {
        // alert(resp.success.Message);
        window.location.href = 'admin/pools';
      }
      this.buttonText = 'Updated';
    });
  }

  addMonth(date: Date) {
    const newDate = new Date(date);
    const d = newDate.getDate();
    const m = newDate.getMonth();
    if (this.pool) {
      return this.pool.investment.expected_return_period === 'Monthly' ? (
        newDate.setMonth(m + 1),
        newDate.getMonth() === 11 ? newDate.setDate(0) : newDate
      ) : (
        newDate.setDate(d + 7)
      );
    }
  }

  deleteReport(report) {
    const proceed = confirm('Confirm Deletion?');
    if (proceed) {
      this.isLoading = true;
      // alert('deleting record :: '+report.id)
      this.reportService.deleteReport(report).subscribe(resp => {
          if (resp && resp.success) {
            // alert(resp.success.Message)
            window.location.href = 'admin/pools/' + this.poolId;
            // this.closeBtn.nativeElement.click();
          }
          this.isLoading = false;
      });
    }
  }

  manageReport(operation, modalData) {
    if (operation == 'create') {
      this.modalData = {investment_id: this.poolId};
      this.modaltitle = 'Create Report';
      this.modalButtonTitle = 'Create';
      this.callBack = this.addReport;
    } else if (operation == 'update') {
      this.modalData = modalData;
      this.modaltitle = 'Update Report';
      this.modalButtonTitle = 'Update';
      this.callBack = this.updateReport;
    }

  }

  addUser(operation, modalData) {
    if (operation === 'create') {
      this.modalData = {investment_id: this.poolId};
      this.modaltitle = 'Add User To Pool';
      this.modalButtonTitle = 'Add User';
      this.callBack = this.updatePool;
    }
  }

  setPlanOperation(investment) {
    if (investment && investment.investment) {
      if (!investment.investment.show_publicly || investment.investment.show_publicly == '0') {
        investment.investment.show_publicly = false;
      }
    }
    this.authService.setCurrentPlanOperation(investment);
  }


  viewUserDetail(user) {
    this.selectedUser = user;
  }

  pullOut() {
    const proceed = confirm('Do you really want to pull out from investment?');
    if (proceed) {
      this.isLoading = true;
      this.investmentService.pullOutFromInvestment(String(this.poolId)).subscribe(resp => {
        if (resp && resp.success) {
          // alert(resp.success.Message)
          this.fetchPool(String(this.poolId));
        }
        this.isLoading = false;
      });
    }
  }

  endInvestment() {
    const proceed = confirm('Do you really want to end this investment?');
    if (proceed) {
      this.isLoading = true;
      this.investmentService.endInvestment(String(this.poolId)).subscribe(resp => {
        if (resp && resp.success) {
          // alert(resp.success.Message)
          this.fetchPool(String(this.poolId));
        }
        this.isLoading = false;
      });
    }
  }

  startInvestment() {
    const proceed = confirm('Do you really want to start this investment?');
    if (proceed) {
      this.isLoading = true;
      this.investmentService.startInvestment(String(this.poolId)).subscribe(resp => {
        if (resp && resp.success) {
          // alert(resp.success.Message)
          this.fetchPool(String(this.poolId));
        }
        this.isLoading = false;
      });
    }
  }

  cancelPool() {
    this.router.navigateByUrl('admin/pools');
  }


  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    if (inputValue.files && inputValue.files[0]) {
      let file: File = inputValue.files[0];
      let myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.image = myReader.result;
        this.pool.investment_image = this.image;
      };
      myReader.onload = (event) => { // called once readAsDataURL is completed
        this.url = 'event.target.result';
      };
      myReader.readAsDataURL(file);
    }
  }

  divisorFunc(expected_return_period) {
    if (expected_return_period === 'Weekly') {
      return 48;
    } else if (expected_return_period === 'Monthly') {
      return 12;
    } else if (this.pool.expected_return_period === 'Daily') {
      return Number(this.pool.duration) * 30;
    }
  }


  calculateEstimate() {
    if (this.pool.investment.investment_amount !== 0 && this.roi !== '' && this.pool.investment.expected_return_period !== '') {
      const cost = this.pool.investment.investment_amount;
      const investment = parseInt(this.roi) / 100;
      const divisor = this.divisorFunc(this.pool.investment.expected_return_period);

      const estimate = (cost * investment) / divisor;
      if (!estimate) {
        // do nothing
      } else {
      this.pool.investment.expected_return_amount = estimate.toFixed(2);
      }
    }
  }

}
