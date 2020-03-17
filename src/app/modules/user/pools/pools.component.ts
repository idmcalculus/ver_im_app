import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from '../../investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {
  isLoading:boolean=true;
  pools:Investment[]=[];
  pool:Investment;
  userType:string;
  categories:any []

  constructor(
<<<<<<< HEAD
    private authService: AppAuthService,
    private investmentService: InvestmentService,
    private userService: UserService) {
      const userpath = window.location.pathname;
      if (userpath.includes('user')) {
=======
    private authService:AppAuthService,
    private router:Router,
    private investmentService:InvestmentService,
    private userService:UserService) { 
      let userpath = window.location.pathname;
      if(userpath.includes('user')){
>>>>>>> link view investment to investment list
        this.userType = 'user';
        this.authService.currentUser.subscribe(resp => {
          if (resp) {
            this.getUserPols(resp.email);
          }
        });
      } else {
        this.userType = 'admin';
        this.getPools();
      }
  }

  ngOnInit() {
  }


  getPools() {
    this.investmentService.getInvestments(false).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
        console.log(this.pools);
        this.getCategories();
      }
    })
  }

  getCategories() {
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
        console.log(this.categories)
      }
      this.isLoading = false;
    });
  }

  getCategoryName(id){
    const res = this.categories.find( r=> r.id == 21);
    return res.category_name;
  }

  getUserPols(email){
    this.investmentService.getUserInvestments(email).subscribe(investments=>{
      if(investments){
        this.pools = investments.success.Data;
        this.getCategories();
      }
    })
  }

<<<<<<< HEAD
  setPlanOperation(investment) {
=======
  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
  }

  setPlanOperation(investment){
>>>>>>> link view investment to investment list
    this.authService.setCurrentPlanOperation(investment);
  }

  setHeaderandFooter() {
    this.authService.setInProfileView(false);
  }

<<<<<<< HEAD
  calculateEstimate(returns, inv) {
    const estimate = (((returns * 12) - inv) / inv) * 100;
    return Math.ceil(estimate);
  }  


filterTable(filterType, filterValue: string) {

}

deleteUser() {

}
=======
  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;

    if (!value) {
      return this.pools;
    } else {
      const filtered = this.pools.filter(pool => {
        if (pool[filterType] !== null) {
        return pool[filterType].toLowerCase().includes(value.toLowerCase())
        }
      });
      console.log('Filtered', filtered);
      this.pools = filtered;
    }
  }

  
>>>>>>> Created Add investment component
}
