 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {InvestmentService} from '../../../../modules/investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';
import { AppAuthService } from 'src/app/core/auth/auth.service';
import { UserService } from '../../../../modules/user/user.service';

@Component({
  selector: 'app-pools',
  templateUrl: './investment-report.component.html',
  styleUrls: ['./investment-report.component.scss']
})
export class PoolreportComponent implements OnInit {
  isLoading:boolean=true;
  pools:Investment[]=[];
  pool:Investment = {title: '', investment_amount: 0, };
  userType:string;
  categories:any []
  report = {};
  reportlog = [];
  searchValue = '';
  filteredPools = [];

  constructor(
    private router:Router,
    private authService: AppAuthService,
    private investmentService: InvestmentService,
    private userService: UserService) {
      const userpath = window.location.pathname;
      if (userpath.includes('user')) {
        this.userType = 'user';
        this.authService.currentUser.subscribe(resp => {
          if (resp) {
            this.getUserPols(resp.email);
          }
        });
      } else {
        this.userType = 'admin';
        this.getPools();
        this.getCategories();
      }
      this.getCategories();
      
  }

  ngOnInit() {
    this.investmentService.getpoolReport().subscribe(resp => {
      if (resp && resp.success) {
        this.report = resp.success.Data;
        this.reportlog.push(this.report);
        console.log(this.reportlog);
        
      }
    });
  }

  getPools() {
    this.isLoading = true;
    this.investmentService.getInvestments(false).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
      }
      this.isLoading = false;
    });
  }

  getCategories() {
    this.investmentService.getCategories().subscribe(resp => {
      if (resp && resp.success) {
        this.categories = resp.success.Data;
      }
      this.isLoading = false;
    });
  }


  getCategoryName(id: number) {
    const res = this.categories.find( r => r.id === 21);
    return res.category_name;
  }

  getUserPols(email) {
    this.investmentService.getUserInvestments(email).subscribe(investments => {
      if (investments) {
        this.pools = investments.success.Data;
        this.getCategories();
      }
    });
  }

  cancelPool() {
    this.router.navigateByUrl('admin/addpools');
  }

  filterTable(filterType, filterValue: string) {
    if (!filterValue || filterValue === null) {
      return this.getPools();
    } else {
        const filtered = this.pools.filter(pool => {
          if (pool[filterType] !== null) {
            return pool[filterType].toLowerCase().includes(filterValue.toLowerCase());
          }
        });
        console.log(filtered);
        this.pools = filtered;
      }
  }
  
}
