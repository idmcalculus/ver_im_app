import { Component, OnInit, EventEmitter,Input,Output } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';

@Component({
  selector: 'app-manage-investment',
  templateUrl: './manage-investment.component.html'
})
export class ManageInvestmentComponent implements OnInit {

  @Input() public modaltitle:string;
  @Output() submit = new EventEmitter<Investment>();

  @Input()
  modalModel:Investment={category_id:"12"};

  constructor() { }

  ngOnInit() {

  }

  modalSubmitted(){
    this.submit.emit(this.modalModel);
  }
}
