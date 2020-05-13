import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Investment } from 'src/app/shared/models/Investment';
import { InvestmentService } from '../../investment/investment.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Category } from 'src/app/shared/models/Category';
import { CloudinaryService } from 'src/app/shared/services/cloudinary.service';

@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.scss']
})
export class AddPoolComponent implements OnInit {
  isLoading: boolean;
  pool: Investment = {investment_amount: 0, expected_return_amount: '', expected_return_period: ''};
  buttonText = 'Add';
  image:any;
  roi: string;
  data:any;
  selectedUser:any;
  category:any;
  public imagePath;
  url = '';
  public message: string;
  pools: Investment;

  @Input() public editable: boolean;
  @Input() public categories: [Category];

  constructor(private route: ActivatedRoute,
              private investmentService: InvestmentService,
              private cloudinaryService: CloudinaryService,
              private router: Router,
    ) {
      this.isLoading = true;
      this.investmentService.getInvestments(false).subscribe(investment => {
        this.pools = investment.success.Data;
        this.isLoading = false;
      });
      this.getCategories();
      }

  ngOnInit() {

  }

  getCategories() {
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
        //console.log(this.categories)
      }
    });
  }

  addInvestment() {
      this.buttonText = 'Adding';
      this.cloudinaryService.upload(this.pool.investment_image).subscribe(resp => {
        if (resp) {
          this.pool.investment_image = resp;
          this.investmentService.addInvestment(this.pool).subscribe(resp => {
            if (resp && resp.success) {
              // alert(resp.success.Message);
              window.location.href = 'admin/pools';
            }
            this.buttonText = 'Add Investment';
          });
        }
      });
  }

  cancelPool() {
    this.router.navigateByUrl('admin/pools');
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    if (inputValue.files && inputValue.files[0]) {
      let file: File = inputValue.files[0];
      let myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.image = myReader.result;
        this.pool.investment_image = this.image;
      };
      myReader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
      myReader.readAsDataURL(file);
    }
  }

  divisorFunc(expected_return_period) {
    if (this.pool.expected_return_period === 'Weekly') {
      return 48;
    } else if (this.pool.expected_return_period === 'Monthly') {
      return 12;
    }
  }

  calculateEstimate() {
    if(this.pool.investment_amount !=0 && this.roi !='' && this.pool.expected_return_period !=''){
      const cost = this.pool.investment_amount
      const investment = parseInt(this.roi) /100 
      const divisor = this.divisorFunc(this.pool.expected_return_period)

      const estimate = (cost * investment) / divisor;
      this.pool.expected_return_amount = estimate.toFixed(2);
    }
  }
}
