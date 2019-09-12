import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestmentService } from './investment.service';
import { Transaction } from 'src/app/shared/models/Transaction';


let category = '0';
let allInvestments = [];

@Component({
    selector: 'app-investment',
    templateUrl: './investment.component.html'
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


    getCategories() {
        this.investmentService.getCategories().subscribe(categories => {
            if (categories && categories.success) {
                this.categories = categories.success.Data;
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

    filterInvestmentsByName(categoryName) {
        this.investments = allInvestments.filter(a1 => {
            return a1.category_name === categoryName;
        });
    }

    filterInvestmentsById(categoryId) {
        if (categoryId === 0) {
            this.investments = allInvestments;
        } else {
            const sel = String(categoryId.id);
            this.investments = allInvestments.filter(a1 => {
                console.log(typeof a1.category_id, typeof sel)
                return a1.category_id === sel;
            });
        }
    }


}
