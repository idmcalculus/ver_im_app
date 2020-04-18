import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminService } from '../../../../modules/admin/admin.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss']
})
export class UseractivityComponent implements OnInit {
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  searchValue = '';
  dashboardData = {};
  p: number = 1;
  activityLog = [];
  filteredAdminActivity = [];
  filteredUserActivity = [];
  isLoading= true;
  User = false;

  constructor(
    private adminService: AdminService,
    private dynamicScrLoader: DynamicScriptLoaderService
    ) {}

  ngOnInit() {
    this.adminService.getDashBoardData().subscribe(resp => {
      if (resp && resp.success) {
        this.dashboardData = resp.success.Data;
        this.activityLog.push(this.dashboardData);
        console.log(this.activityLog);
        this.filteredAdminActivity = this.activityLog[0].fetch_activities.filter((activity) => activity.user_category === 'Admin');
        this.filteredUserActivity  = this.activityLog[0].fetch_activities.filter((activity) => activity.user_category === 'User');

        this.isLoading =  false;
        this.dynamicScrLoader.loadSingle('data-table');
        this.dynamicScrLoader.loadSingle('trigger-data-table');
      }
    });
  }

  Toggle() {
      if (this.User == false){
        this.User = true;
      } else {
        this.User = false;
      }
  }

  getDashBoardData() {
    this.isLoading = true;
    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.dashboardData = resp.success.Data;
          this.activityLog.push(this.dashboardData);
          this.filteredAdminActivity = this.activityLog[0].fetch_activities.filter((activity) => activity.user_category === 'Admin');
          this.filteredUserActivity  = this.activityLog[0].fetch_activities.filter((activity) => activity.user_category === 'User');
      }
      this.isLoading = false;
    });
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value;
    if (!value || value === null) {
      return this.getDashBoardData();
    } else {
      const filtered = this.filteredAdminActivity.filter(activity => {
        if (activity[filterType] !== null) {
            const filterate = activity[filterType].toString();
            return filterate.toLowerCase().includes(value.toLowerCase())
        }
      });
      this.filteredAdminActivity = filtered;
    }
  }

  filterTable2(filterType, filterValue): any {
    const value = filterValue.target.value;
    if (!value || value === null) {
      return this.getDashBoardData();
    } else {
      const filtered = this.filteredUserActivity.filter(activity => {
        if (activity[filterType] !== null) {
            const filterate = activity[filterType].toString();
            return filterate.toLowerCase().includes(value.toLowerCase())
        }
      });
      this.filteredUserActivity = filtered;
    }
  }

  clearSearch() {
    this.searchValue = null;
    return this.getDashBoardData();
  }
}
