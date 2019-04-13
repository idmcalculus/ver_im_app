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
  inEditMode=false;
  isLoading:boolean=true;
  category:Category={category_name:''};
  categories=[]
  constructor(private investmentService:InvestmentService) { 
    this.investmentService.getCategories().subscribe(resp=>{
      if(resp && resp.success){
        this.categories = resp.success.Data;
      }
      this.isLoading=false;
    })
  }

  ngOnInit() {
  }

  addCategory(){
    if(this.category.category_name){
        this.buttonText = 'Submitting'
        this.investmentService.addCategory(this.category).subscribe(resp=>{
          if(resp && resp.success){
            this.categories.push(this.category)
            alert(resp.success.Message);
          }
          this.buttonText = 'Add Category'
        })
    }    
  }

  updateCategory(data:Category){
    this.investmentService.updateCategory(data).subscribe(resp=>{
      if(resp && resp.success){
        data.inEditMode = !data.inEditMode;
        alert(resp.success.Message);
      }
    })
  }


}
