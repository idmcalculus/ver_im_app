import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestmentService } from './../investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Subscription } from 'rxjs';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';

declare var xpressPay: any;
let category = '0';
let allInvestments = [];
@Component({
    selector: 'app-investment-detail',
    templateUrl: './investment-detail.component.html',
    styleUrls: ['./investment-detail.component.scss']
})

export class InvestmentDetailComponent implements OnInit {

    isLoading: boolean = true;
    investment: Investment;
    transaction: Transaction = { investment_id: 0, number_of_pools: 0 };
    userinfo: User;
    amountPerPool: number = 0;
    userEmail: string = '';
    transactionRef: string = '';
    numOfPoolsLeft: number = 0;
    currentUserSubscription: Subscription;
    reportData: any;
    investments: any = [];
    categories: any = [];
    selectedCategory: string = '0';


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private investmentService: InvestmentService,
        private authService: AppAuthService,
        private acivatedRoute: ActivatedRoute,
        private toastrService: ToastrService
    ) {


    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params) => {
            this.investments = [];
            this.isLoading = true;
            var investmentId = params['id'];
            this.getInvestment(investmentId);
            this.getInvestments();
        });

    }

    getInvestment(id: string) {
        this.investmentService.getInvestment(id).subscribe(investments => {
            if (investments && investments.success) {
                this.investment = investments.success.Data.investment;
                var tday = new Date().getTime;
                this.investment.reference = `${tday}`;
                this.amountPerPool = this.investment.investment_amount;
                var randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0, 4)}`;
                this.transactionRef = randomString;

                this.activatedRoute.queryParams.subscribe(resp => {
                    var statusCode = resp['status-code'];
                    var message = resp['status-message'];
                    if (statusCode == '08' || statusCode == '00') {
                        var qty = localStorage.getItem(resp['transaction-id']);
                        if (qty) {
                            this.investment.id = Number(id);
                            this.transaction.number_of_pools = Number(qty);
                            this.investment.reference = resp['transaction-id'];
                            localStorage.removeItem(resp['transaction-id']);
                            this.isLoading = true;
                            this.joinInvestment();

                        }
                    } else if (message) {
                        console.log(message);
                    }
                });
            }
            this.isLoading = false;
        });

        this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
            this.userinfo = user;
        });
    }

    getInvestments() {

        this.investmentService.getInvestments(true).subscribe(investments => {
            var investmentArray = [];
            if (investments) {
                investmentArray = investments.success.Data;
                var cnt = 0;
                investmentArray.forEach(element => {
                    if (element.is_investment_started === '0' && element.is_investment_ended === '0') {
                        this.investments[cnt] = element;
                        cnt++;
                    }
                });
            }
            allInvestments = this.investments;
            this.isLoading = false;

            var categoryName = this.activatedRoute.snapshot.params['category'];
            if (categoryName) {
                var category = this.categories.filter(a1 => {
                    return a1.category_name.trim() == categoryName.trim();
                });
                if (category && category.length > 0) {
                    this.selectedCategory = category[0].id;
                    this.filterInvestments();
                }
            }
        });
    }

    filterInvestments() {
        category = this.selectedCategory;
        if (category === '0') {
            this.investments = allInvestments;
        } else {
            this.investments = allInvestments.filter(a1 => {
                return a1.category_id === category;
            });
        }
    }

    joinInvestment() {
        this.isLoading = true;
        this.transaction.investment_id = this.investment.id;
        this.transaction.amount_paid = this.investment.investment_amount * this.transaction.number_of_pools;
        this.transaction.amount_paid = Number(this.transaction.amount_paid.toFixed(2));
        this.transaction.payment_reference = this.investment.reference;
        this.investmentService.joinInvestment(this.transaction).subscribe(resp => {
            if (resp && resp.success) {
                // alert(resp.success.Message)
                this.toastrService.success(resp.success.Message);
                window.location.href = 'investments';
            }
            this.isLoading = false;
        });
    }

    paymentCancel() {
        console.log('payment modal closed');
    }

    refereshPaymentRef() {
        var randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0, 4)}`;
        this.transactionRef = randomString;
    }


    xpressPay(email, amnt, firstName, lastName, mobile, tranRef) {
        this.isLoading = true;
        localStorage.setItem(tranRef, String(this.transaction.number_of_pools));
        xpressPay(email, amnt, firstName, lastName, mobile, tranRef);
    }

}
