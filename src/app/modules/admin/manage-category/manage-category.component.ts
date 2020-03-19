import { Component } from '@angular/core';
import { InvestmentService } from '../../investment/investment.service';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent {

  buttonText = 'Add Category';
  updateButtonText = 'check';
  inEditMode = false;
  isLoading = true;
  category: Category = {category_name: ''};
  categories = [];
  filteredCategories = [];
  searchValue = '';

  constructor(private investmentService: InvestmentService) {
    this.getCategories();
  }
  addCategory() {
    if (this.category.category_name) {
        this.buttonText = 'Submitting';
        this.investmentService.addCategory(this.category).subscribe(resp => {
          if (resp && resp.success) {
            // alert(resp.success.Message);
            this.getCategories();
          }
          this.buttonText = 'Add Category';
        });
    }
  }

  updateCategory(category: Category) {
    this.updateButtonText = 'spinner';
    this.investmentService.updateCategory(category).subscribe(resp => {
      if (resp && resp.success) {
        category.inEditMode = !category.inEditMode;
        // alert(resp.success.Message);
        this.updateButtonText = 'check';
      }
    });
  }

  deleteCategory(category) {
    if (confirm(`Confirm Deletion of categoory ${category.category_name}`)) {
      this.investmentService.deleteCategory(category).subscribe(resp => {
        if (resp && resp.success) {
          // alert(resp.success.Message);
          this.getCategories();
        }
      });
    }
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

  filterTable(filterType, filterValue: string) {

    if (!filterValue || filterValue === null) {
      return this.getCategories();
    } else {
        const filtered = this.categories.filter(category => {
          if (category[filterType] !== null) {
            return category[filterType].toLowerCase().includes(filterValue.toLowerCase());
          }
        });
        console.log(filtered);
        this.categories = filtered;
      }
  }

}
