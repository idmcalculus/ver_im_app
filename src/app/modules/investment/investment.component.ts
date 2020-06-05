import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestmentService } from './investment.service';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Investment } from 'src/app/shared/models/Investment';
import { MatFormFieldControl, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { FormControl } from '@angular/forms';


let category = '0';
let allInvestments = [];

@Component({
    selector: 'app-investment',
    templateUrl: './investment.component.html',
    styleUrls: ['./investment.component.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: InvestmentComponent },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'} }
    ]
})


export class InvestmentComponent implements OnInit {
    allInvestments: Investment [];
    investmentArray: Investment [];
    isLoading = true;
    investments: any = [];
    categories: any = [];
    selectedCategory = '0';
    transaction: Transaction;
    Category = new FormControl();

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
            let investmentArray = [];

            if (investments) {
                investmentArray = investments.success.Data;
                let cnt = 0;
                investmentArray.forEach(element => {
                    if (element.is_investment_started === 0 && element.is_investment_ended === 0) {
                        this.investments[cnt] = element;
                        cnt++;
                    }
                });
            }
            allInvestments = this.investments;
            this.isLoading = false;
            let categoryName = this.activatedRoute.snapshot.params.category;
            if (categoryName) {
                let category = this.categories.filter(a1 => {
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

    filterInvestmentsById(category) {
        if (category === 0) {
            this.investments = allInvestments;
        } else {
            this.investments = allInvestments.filter(a1 => {
                return a1.category_id === category.id;
            });
        }
    }

    calculateEstimate(returns, inv) {
        const estimate = (((returns * 12) - inv) / inv) * 100;
        return Math.ceil(estimate);
    }

}
