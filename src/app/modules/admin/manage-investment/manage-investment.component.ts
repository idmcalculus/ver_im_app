import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-manage-investment',
  templateUrl: './manage-investment.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageInvestmentComponent implements OnInit {

  @Input() public modaltitle: string;
  @Input() public modalButtonTitle: string;
  @Input() public modalData: any;
  @Input() public categories: [Category];
  @Output() submit = new EventEmitter<Investment>();

  image: any;
  isSubmitting;

  constructor() { }

  ngOnInit() {

  }

  modalSubmitted() {
    this.submit.emit(this.modalData);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.modalData.investment_image = this.image;
    };
    myReader.readAsDataURL(file);
  }
}
