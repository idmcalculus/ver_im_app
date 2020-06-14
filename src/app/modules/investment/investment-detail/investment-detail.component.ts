import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestmentService } from './../investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Subscription } from 'rxjs';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';


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
    userinfo: User;
    amountPerPool = 0;
    userEmail = '';
    validpoolError:string;
    transAmount:number;
    transactionRef = '';
    transactionRef2 = '';
    numOfPoolsLeft = 0;
    currentUserSubscription: Subscription;
    reportData: any;
    investments: any = [];
    categories: any = [];
    selectedCategory = '0';
    allinv: any = [];
    ViaXpress = false;
    subOptions = [];
    payment_id = "";


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
            const investmentId = params['id'];
            this.getInvestment(investmentId);
            this.getStat(investmentId);
            this.getInvestments();
            this.confirmPayment();

        });
    }

    validPool() {
        if (this.transaction.number_of_pools != 0){
        const remain = this.investment.max_num_of_slots - this.investment.num_of_pools_taken
        const want = this.transaction.number_of_pools
    
        if(want > remain) {
          this.validpoolError = 'Number of Available Slot Exceeded';
        } else {
          this.validpoolError ='';
        }
      }
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
                const tday = new Date().getTime;
                this.investment.reference = `${tday}`;
                this.amountPerPool = this.investment.investment_amount;
                const randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0, 4)}`;
                this.transactionRef = randomString;
                const slotsLeft = this.investment.max_num_of_slots - this.investment.num_of_pools_taken;
                for (let i = 1 ; i <= slotsLeft; i++) {
                    this.subOptions.push(i);
                }
                
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


    async confirmPayment() {
        this.isLoading = true;      
        this.activatedRoute.queryParams.subscribe(async resp => {
          if (resp['status-code']) {  
            const statusCode = resp['status-code'];
            const transactionId = resp['transaction-id'];
            const statMessage = resp['status-message'];
            const investmentId = resp['id'];
            if(transactionId) {
                    //get transaction id from url
                    if(statusCode === '000' || statusCode === '08'){
                        const res = await this.investmentService.checkTransaction(this.transaction);
                        if (res.status === 'FAILED'){
                            this.toastrService.error(res.message);
                            this.isLoading = false;
                            
                        }else{  
                            const resp:any = this.investmentService.verifyTransaction(transactionId)
                            if(resp.investment.length > 0){
                                this.toastrService.error('investment has already been processed');
                            }else{
                                //some logic before join investment
                                this.joinInvestment()
                                this.isLoading = false;
                                this.investmentService.createTransactionRecord(transactionId,this.userinfo.id,investmentId);
                            }
                        }
                    }else{
                        this.isLoading = false;
                        this.toastrService.error(statMessage);
                    }
                
            }
        }
    });  
    }

    joinInvestment() {
        this.isLoading = true;
        this.transaction.investment_id = this.investment.id;
        this.transaction.amount_paid =  Number(localStorage.getItem('transAmount'));
        this.transaction.number_of_pools = Number(localStorage.getItem('poolsTaken'));
        this.transaction.payment_reference = this.investment.reference;
     //   this.investmentService.joinInvestment(this.transaction).subscribe(resp => {
      //      if (resp && resp.success) {
      //          this.toastrService.success(resp.success.Message);
      //          this.closemodal.nativeElement.click();
        //        localStorage.removeItem('poolsTaken');
          //      localStorage.removeItem('transAmount');
            //}
          //  this.isLoading = false;
      //  });
      console.log('HELLO WORLD');
      
    }

    redirectBack(){
        this.router.navigateByUrl('/investments');
    }

    refereshPaymentRef() {
        const randomString = `${String(Math.random()).substring(10)}${String(new Date().getTime()).substring(0, 4)}`;
        this.transactionRef = randomString;
    }

    initiatePay(transAmount, investment_amount, number_of_pools,paymentId,investmentId ) {
        transAmount = investment_amount*number_of_pools;
        this.isLoading = true;
        localStorage.setItem('transAmount', String(transAmount));
        localStorage.setItem('poolsTaken', String(number_of_pools));
        this.investment.reference = paymentId;
        this.closemodal.nativeElement.click();
        if (this.investment.reference){
            const resp:any = this.investmentService.verifyBankTransaction(this.investment.reference)
                    if(resp.investment.length > 0){
                        this.toastrService.error('investment has already been processed');
                    }else{
                        //some logic before join investment
                        this.joinInvestment()
                        this.isLoading = false;
                        this.investmentService.createTransactionRecord(paymentId,this.userinfo.id,investmentId);
                    }               
                this.isLoading = false;
            }
    }

    payXpress(email, transAmount, firstName, lastName, mobile, investment_amount, number_of_pools) {
        transAmount = investment_amount*number_of_pools;
        this.isLoading = true;
        localStorage.setItem('transAmount', String(transAmount));
        localStorage.setItem('poolsTaken', String(number_of_pools));        
        xpressPay(email, transAmount, firstName, lastName, mobile, this.transactionRef);
    }

    change() {
        this.ViaXpress = !this.ViaXpress;
    }

}
