import { Component, OnInit } from '@angular/core';
import { InvestmentService } from '../../investment/investment.service';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  buttonText='Add Category'
  updateButtonText='update'
  inEditMode=false;
  isLoading:boolean=true;
  category:Category={category_name:''};
  categories=[]
  constructor(private investmentService:InvestmentService) { 
    this.getCategories()
  }

  ngOnInit() {
  }

  addCategory(){
    if(this.category.category_name){
        this.buttonText = 'Submitting'
        this.investmentService.addCategory(this.category).subscribe(resp=>{
          if(resp && resp.success){
            // alert(resp.success.Message);
            this.getCategories()
          }
          this.buttonText = 'Add Category'
        })
    }    
  }

  updateCategory(category:Category){
    this.updateButtonText = 'updating';
    this.investmentService.updateCategory(category).subscribe(resp=>{
      if(resp && resp.success){
        category.inEditMode = !category.inEditMode;
        // alert(resp.success.Message);
        this.updateButtonText = 'update'
      }
    })
  }

  deleteCategory(category){
    if(confirm(`Confirm Deletion of categoory ${category.category_name}`)){
      this.investmentService.deleteCategory(category).subscribe(resp=>{
        if(resp && resp.success){
          // alert(resp.success.Message);
          this.getCategories()
        }
      })
    }
  }

  getCategories(){
    this.isLoading=true;
    this.investmentService.getCategories().subscribe(resp=>{
      if(resp && resp.success){
        this.categories = resp.success.Data;
      }
      this.isLoading=false;
    })
  }


}
