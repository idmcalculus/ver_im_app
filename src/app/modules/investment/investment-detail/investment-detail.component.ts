import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestmentService } from './../investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Subscription } from 'rxjs';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';


declare var xpressPay: any;
@Component({
    selector: 'app-investment-detail',
    templateUrl: './investment-detail.component.html',
    styleUrls: ['./investment-detail.component.scss']
})

export class InvestmentDetailComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closemodal') closemodal;
    isLoading = true;
    category = '0';
    allInvestments = [];
    investment: Investment;
    transaction: Transaction = { investment_id: 0, number_of_pools: 0 };
    payment_id: null;
    userinfo: User;
    amountPerPool = 0;
    userEmail = '';
    transactionRef = '';
    numOfPoolsLeft = 0;
    currentUserSubscription: Subscription;
    reportData: any;
    investments: any = [];
    categories: any = [];
    selectedCategory = '0';
    allinv: any = [];
    ViaXpress = true;
    subOptions = [];


    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private investmentService: InvestmentService,
        private authService: AppAuthService,
        private toastrService: ToastrService
    ) {


    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params) => {
            this.investments = [];
            this.isLoading = true;
            const investmentId = params.id;
            this.getInvestment(investmentId);
            this.getStat(investmentId);
            this.getInvestments();
        });

        this.activatedRoute.params.subscribe((params) => {
            this.investments = [];
            this.isLoading = true;
            var investmentId = params['id'];
            this.getInvestment(investmentId);
            this.getInvestments();
        });

    }

    triggerSecond() {
        this.closebutton.nativeElement.click();
    }

    getStat(inv){
        this.investmentService.getStats(inv).subscribe(investments => {
            return
        });
    }

    getInvestment(id: string) {
        this.investmentService.getInvestment(id).subscribe(investments => {
            if (investments && investments.success) {
                this.investment = investments.success.Data.investment;
                console.log(this.investment);
                const tday = new Date().getTime;
                this.investment.reference = `${tday}`;
                this.amountPerPool = this.investment.investment_amount;
                const randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0, 4)}`;
                this.transactionRef = randomString;
                const slotsLeft = this.investment.max_num_of_slots - this.investment.num_of_pools_taken;
                for (let i = 1 ; i <= slotsLeft; i++) {
                    this.subOptions.push(i);
                }

                this.activatedRoute.queryParams.subscribe(resp => {
                    const statusCode = resp['status-code'];
                    const message = resp['status-message'];
                    if (statusCode === '08' || statusCode === '00') {
                        const qty = localStorage.getItem(resp['transaction-id']);
                        if (qty) {
                            this.investment.id = Number(id);
                            this.transaction.number_of_pools = Number(qty);
                            this.investment.reference = resp['transaction-id'];
                            localStorage.removeItem(resp['transaction-id']);
                            this.isLoading = true;
                            this.joinInvestment();

                        }
                    } else if (message) {
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
            let investmentArray = [];
            if (investments) {
                investmentArray = investments.success.Data;
                var cnt = 0;
                investmentArray.forEach(element => {
                    if (element.is_investment_started === 0 && element.is_investment_ended === 0) {
                        this.investments[cnt] = element;
                        cnt++;
                    }
                });
            }
            this.allinv = [this.investments[0], this.investments[cnt - 1], this.investments[(cnt - 3)]];
            this.isLoading = false;

            const categoryName = this.activatedRoute.snapshot.params.category;
            if (categoryName) {
                const category = this.categories.filter(a1 => {
                    return a1.category_name.trim() === categoryName.trim();
                });
                if (category && category.length > 0) {
                    this.selectedCategory = category[0].id;
                    this.filterInvestments();
                }
            }
        });
    }

    filterInvestments() {
        this.category = this.selectedCategory;
        if (this.category === '0') {
            this.investments = this.allInvestments;
        } else {
            this.investments = this.allInvestments;
        }
    }


    joinsInvestment() {
        this.closemodal.nativeElement.click();
    }

    joinInvestment() {
        this.isLoading = true;
        this.transaction.investment_id = this.investment.id;
        this.transaction.amount_paid = this.investment.investment_amount * this.transaction.number_of_pools;
        this.transaction.amount_paid = Number(this.transaction.amount_paid.toFixed(2));
        this.transaction.payment_reference = this.investment.reference;
        this.investmentService.joinInvestment(this.transaction).subscribe(resp => {
            if (resp && resp.success) {
                this.toastrService.success(resp.success.Message);
                this.closemodal.nativeElement.click();

            }
            this.isLoading = false;
        });
    }

    paymentCancel() {
    }

    redirectBack(){
        this.router.navigateByUrl('/investments');
    }

    refereshPaymentRef() {
        const randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0, 4)}`;
        this.transactionRef = randomString;
    }

    xpressPay(email, amnt, firstName, lastName, mobile, tranRef,crypto) {

        this.isLoading = true;
        localStorage.setItem(tranRef, String(this.transaction.number_of_pools));
        xpressPay(email, amnt, firstName, lastName, mobile, tranRef,crypto);
    }

    change() {
        this.ViaXpress = !this.ViaXpress;
    }

}
