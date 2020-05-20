import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ExportData } from 'src/app/shared/models/ExportData';
import { AdminService } from '../../../../modules/admin/admin.service';
import { DynamicScriptLoaderService } from 'src/app/shared/services/dynamic-script-loader.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss']
})
export class UseractivityComponent implements OnInit {
  @Input() public user: User = {email: '', password: '', country: '', first_name: '', last_name: '', bank_name: ''};
  searchValue = '';
  pageValue = 5;
  dashboardData = {};
  p = 1;
  activityLog = [];
  filteredAdminActivity = [];
  adminActivity = [];
  userActivity = [];
  filteredUserActivity = [];
  isLoading = true;
  User = false;
  dateEnd: '';
  dateStart: '';

  constructor(
    private adminService: AdminService,
    private dynamicScrLoader: DynamicScriptLoaderService,
    private reportService: ReportService
    ) {}

  ngOnInit() {
    this.getDashBoardData();
  }

  Toggle() {
      if (this.User == false) {
        this.User = true;
      } else {
        this.User = false;
      }
  }

  setItemsPerPage(event) {
    this.pageValue = event;
}

  getDashBoardData() {
    this.isLoading = true;
    this.adminService.getDashBoardData().subscribe(resp => {
        if (resp && resp.success) {
          this.dashboardData = resp.success.Data;
          this.activityLog.push(this.dashboardData);
          this.filteredAdminActivity = this.activityLog[0].fetch_activities.filter((activity) => activity.user_category === 'Admin');
          this.adminActivity = this.filteredAdminActivity;
          this.filteredUserActivity  = this.activityLog[0].fetch_activities.filter((activity) => activity.user_category === 'User');
          this.userActivity = this.filteredUserActivity;
        }
        this.isLoading = false;
    });
  }

  filterTable(filterType, filterValue): any {
    const value = filterValue.target.value.toString().toLowerCase();
    const filtered = this.adminActivity.filter(activity => {
      if (activity[filterType] !== null) {
          const filterate = activity[filterType].toString().toLowerCase();
          if (filterate.indexOf(value) >= 0) {
            return activity;
          }
      }
    });
    this.filteredAdminActivity = filtered;
  }

  filterTable2(filterType, filterValue): any {
    const value = filterValue.target.value.toString().toLowerCase();
    const filtered = this.userActivity.filter(activity => {
      if (activity[filterType] !== null) {
          const filterate = activity[filterType].toString().toLowerCase();
          if (filterate.indexOf(value) >= 0) {
            return activity;
          }
      }
    });
    this.filteredUserActivity = filtered;
  }

  filterDate(dateStart, dateEnd): any {
    const filterStart = dateStart;
    const filterEnd = dateEnd;
    if (filterStart && filterEnd) {
        const selectedActivity = this.filteredAdminActivity.filter(range => {
            if (range.created_at > filterStart && range.created_at < filterEnd) {
              return range;
            }
        });
        this.filteredAdminActivity = selectedActivity;
    } else {
        return this.filteredAdminActivity;
    }
  }

  filterDate2(dateStart, dateEnd): any {
    const filterStart = dateStart;
    const filterEnd = dateEnd;
    if (filterStart && filterEnd) {
        const selectedActivity = this.filteredUserActivity.filter(range => {
            if (range.created_at > filterStart && range.created_at < filterEnd) {
              return range;
            }
        });
        this.filteredUserActivity = selectedActivity;
    } else {
        return this.filteredUserActivity;
    }
  }

  clearSearch() {
    this.dateStart = '';
    this.dateEnd = '';
    this.searchValue = null;
    return this.getDashBoardData();
  }

  saveAsCSV() {
    if (this.filteredAdminActivity.length > 0) {
      const items: ExportData[] = [];

      this.filteredAdminActivity.forEach(line => {
        const reportDate = new Date();
        const csvLine: ExportData = {
          date: `${reportDate.getDate()}/${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`,
          activity: line.activity,
          created_at: line.created_at,
          ip_address: line.ip_address,
        };
        items.push(csvLine);
      });

      this.reportService.exportToCsv('myCsvDocumentName.csv', items);
    }
}

}
