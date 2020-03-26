import { Component, OnInit, EventEmitter,Input,Output} from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from '../../investment/investment.service';
import { ActivatedRoute,Router} from '@angular/router';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.scss']
})
export class AddPoolComponent implements OnInit {
  @Input() public modaltitle:string;
  @Input() public modalButtonTitle:string;
  @Input() public modalData:any;
  @Output() submit = new EventEmitter<Investment>();

  categories:[];
  isLoading = true;
  image:any;
  isSubmitting;
  expected_return: number;
  investment_amount: number;
  period: string;
  returns: string;

  constructor(private route:ActivatedRoute,
    private investmentService: InvestmentService,
    private router:Router,
    ) {
      this.getCategories();
      }

  ngOnInit() {
    
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

  modalSubmitted(){
    // console.log('submitting :: '+JSON.stringify(this.modalData))
    this.submit.emit(this.modalData);
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.modalData.investment_image = this.image;
    }
    myReader.readAsDataURL(file);
  }
  cancelPool() {
    this.router.navigateByUrl('admin/pools');
  }

  divisorFunc (period) {
    if (period === "Weekly") {
      return 48;
    } else if (period === "Monthly") {
      return 12;
    }
  };

  calculateEstimate(){
    const cost = this.investment_amount
    const investment = this.expected_return/100 
    const divisor = this.divisorFunc(this.period)

    const estimate = (cost * investment) / divisor
    this.returns = estimate.toFixed(2)
  }
  

}
