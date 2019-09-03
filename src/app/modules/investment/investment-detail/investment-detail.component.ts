import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {InvestmentService} from './../investment.service';
import {Investment} from 'src/app/shared/models/Investment';
import {Transaction} from 'src/app/shared/models/Transaction';
import {Subscription} from 'rxjs';
import {AppAuthService} from 'src/app/core/auth/auth.service';
import {User} from 'src/app/shared/models/user';
import {ToastrService} from 'ngx-toastr';

declare var xpressPay: any;

@Component({
    selector: 'app-investment-detail',
    templateUrl: './investment-detail.component.html',
    styleUrls: ['./investment-detail.component.css']
})

export class InvestmentDetailComponent implements OnInit {

    isLoading: boolean = true;
    investment: Investment;
    transaction: Transaction = {investment_id: 0, number_of_pools: 0};
    userinfo: User;
    amountPerPool: number = 0;
    userEmail: string = '';
    transactionRef: string = '';
    numOfPoolsLeft: number = 0;
    currentUserSubscription: Subscription;
    reportData: any;


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
        var investmentId = this.activatedRoute.snapshot.params['id'];
        this.getInvestment(investmentId);

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
