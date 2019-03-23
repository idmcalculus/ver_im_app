import { Component, OnInit, EventEmitter,Input,Output } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-manage-investment',
  templateUrl: './manage-investment.component.html'
})
export class ManageInvestmentComponent implements OnInit {

  @Input() public modaltitle:string;
  @Input() public categories:[Category];
  @Output() submit = new EventEmitter<Investment>();

  @Input()
  modalModel:Investment={category_id:0};
  isSubmitting;
  
  constructor() { }

  ngOnInit() {
    console.log("val passed is: "+this.modaltitle+" and "+JSON.stringify(this.categories))
  }

  modalSubmitted(){
    console.log("calling: ")
    this.modalModel.investment_image="";
    this.submit.emit(this.modalModel);
  }
}