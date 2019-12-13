import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestmentService } from './investment.service';
import { Transaction } from 'src/app/shared/models/Transaction';


let category = '0';
let allInvestments = [];

@Component({
    selector: 'app-investment',
    templateUrl: './investment.component.html',
    styleUrls: ['./investment.component.scss']
})


export class InvestmentComponent implements OnInit {


    isLoading: boolean = true;
    investments: any = [];
    categories: any = [];
    selectedCategory: string = '0';

    transaction: Transaction;

    constructor(
        private routes: Router,
        private investmentService: InvestmentService,
        private activatedRoute: ActivatedRoute) {
        this.getCategories();
    }

    ngOnInit() {
        this.getInvestments();
    }


    getInvestments() {

        this.investmentService.getInvestments(true).subscribe(investments => {
            var investmentArray = [];
            
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
            allInvestments = this.investments;
            this.isLoading = false;
            console.log(investments,investmentArray,this.investments,allInvestments);
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


    getCategories() {
        this.investmentService.getCategories().subscribe(categories => {
            if (categories && categories.success) {
                this.categories = categories.success.Data;
                console.log(this.categories,'====');
                
            }
        });
    }

    filterInvestments() {
        category = this.selectedCategory;
        if (category === '0') {
            this.investments = allInvestments;
        } else {
            this.investments = allInvestments.filter(a1 => {
                const sel = String(category);
                return a1.category_id === sel;
            });
        }
    }

    filterInvestmentsByName(categoryName) {
        this.investments = allInvestments.filter(a1 => {
            return a1.category_name === categoryName;
        });
    }

    filterInvestmentsById(categoryId) {
        if (categoryId === 0) {
            this.investments = allInvestments;
        } else {
            const sel = String(categoryId);
            const se = allInvestments.filter(a1 => {
                return a1.category_id === parseInt(sel,10);
            });
            this.investments = se;
        }
    }

    calculateEstimate(returns,inv){
        const estimate = (((returns*12) - inv)/inv) * 100;
        return Math.ceil(estimate);
    }


}
