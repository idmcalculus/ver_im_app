import { Component, OnInit } from '@angular/core';
// import {DatasharerService} from '../../core/datasharer/datasharer.service';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import {Router} from '@angular/router';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from '../investment/investment.service';
import { Subscription } from 'rxjs';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  user: User = {email: '', password: '', user_category: 'Admin'};
  investment: Investment;
  investments: [Investment];
  categories: [];
  modaltitle = 'Create Plan';
  modalButtonTitle = '';
  modalData: Investment = {};
  callBack: any;
  currentPlanOperation: Subscription;

  constructor(
    private authService: AppAuthService,
    private router: Router,
    private investmentService: InvestmentService,
    private cloudinaryService: CloudinaryService,
    private dynamicScriptLoader: DynamicScriptLoaderService
    ) {
      this.authService.setInProfileView(true);
      this.currentPlanOperation = this.authService.currentManagePlanOperation.subscribe(modal => {
        this.setPlanModal(modal);
    });

  }

  ngOnInit() {
    // this.loadScripts();
    this.authService.validateSession().then(resp => {
      if (resp && resp.email) {
        this.user = resp;
        this.getCategories();
      }
    });
  }

  addInvestmnet(filledInvestment: Investment) {
    if (filledInvestment.title) {
      this.modalButtonTitle = 'submitting';
      this.cloudinaryService.upload(filledInvestment.investment_image).subscribe(resp => {
        if (resp) {
          filledInvestment.investment_image = resp;
          this.investmentService.addInvestment(filledInvestment).subscribe(resp => {
            if (resp && resp.success) {
              // alert(resp.success.Message);
              window.location.href = 'admin/pools';
            }
            this.modalButtonTitle = 'Create';
          });
        }
      });
    }
  }

  updateInvestment(filledInvestment: Investment) {
    this.investment = filledInvestment;
    if (filledInvestment.title) {
      this.modalButtonTitle = 'submitting';
      this.cloudinaryService.upload(filledInvestment.investment_image).subscribe(resp => {
        if (resp) {
          filledInvestment.investment_image = resp;
          this.investmentService.updateInvestment(filledInvestment).subscribe(resp => {
            if (resp && resp.success) {
              // alert(resp.success.Message);
              this.modalData = this.investment = filledInvestment;
            }
            this.modalButtonTitle = 'Update';
          });
        }
      });
    }
  }

  getInvestments() {

  }

  getInvestment(id: number) {

  }

  getCategories() {
    this.investmentService.getCategories().subscribe(categories => {
      if (categories && categories.success) {
        this.categories = categories.success.Data;
      }
    });
  }

  setPlanModal(modalData) {
    if (modalData) {
      this.modaltitle = 'Update Plan';
      this.modalButtonTitle = 'Update';
      this.modalData = modalData.investment;
      this.callBack = this.updateInvestment;
    } else {
      this.modaltitle = 'Create Plan';
      this.modalButtonTitle = 'Create';
      this.modalData = {};
      this.callBack = this.addInvestmnet;
    }
  }

  private loadScripts() {
      this.dynamicScriptLoader.load('p-coded', 'v-layout',
      'slimscroll', 'dash', 'platform', 'data-table', 'flat-pickr');
  }

}
