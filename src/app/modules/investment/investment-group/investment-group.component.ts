import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../../../modal/modal.component';
import { InvestmentService } from '../investment.service';
import { Investment } from '../../../shared/models/Investment';
import { MatFormFieldControl } from '@angular/material';
import { Location } from '@angular/common';
import { InvestmentGroup } from 'src/app/shared/models/InvestmentGroup';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment-group',
  templateUrl: './investment-group.component.html',
  styleUrls: ['./investment-group.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: InvestmentGroupComponent }
  ]
})
export class InvestmentGroupComponent implements OnInit {
  isLoading = true;
  investmentGroupNames = new FormControl();
  investmentGroupName: string;
  investments: Investment[] = [];
  investmentGroups: InvestmentGroup[] = [];
  group_name: InvestmentGroup = {group_name: ''};
  selectedValue: Investment[] = [];
  selectedGroup: InvestmentGroup;
  group_id: any;
  investmentIds: string;
  idArray: any[];
  selectedPortfolios: any[];
  investment = new FormControl();

  constructor(public matDialog: MatDialog,
              private investmentService: InvestmentService,
              private toastrService: ToastrService,
              private location: Location,
              private router: Router) {
                this.getInvestments();
                this.getInvestmentGroups();
              }

  ngOnInit() {
  }

  bindData(group) {
    this.isLoading = true;
    this.selectedPortfolios = [];
    const data: any = {
      group_name: group.group_name
    };
    this.investmentService.getInvestmentGroup(data).subscribe(resp => {
      if (resp && resp.success) {
        const groups = resp.success.Data;
        const numOfGroup = groups.length;
        if (numOfGroup > 0) {
          this.investmentIds = groups[numOfGroup - 1].investment_id;
          this.idArray = this.investmentIds.split(',');
          this.idArray.forEach(id => {
            const foundInvestment = this.investments.find(investment => investment.id === Number(id));
            this.selectedPortfolios.push(foundInvestment);
          });
        }
      }
      this.isLoading = false;
    });
    this.investment.setValue(this.selectedPortfolios);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.data = {name: this.investmentGroupName};
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result && result !== null) {
        const data = {
          group_name: result
        };
        return this.investmentService.addInvestmentGroup(data).subscribe(group => {
          if (group && group.success) {
            this.getInvestmentGroups();
          } else {
            this.toastrService.error('There was an issue adding groups... Try again later');
          }
        });
      }
    });
  }

  getInvestmentGroups() {
    this.isLoading = true;
    this.investmentService.getInvestmentGroups().subscribe(groups => {
      if (groups && groups.success) {
        this.investmentGroups = groups.success.Data;
      }
      this.isLoading = false;
    });
  }

  deleteGroup(group) {
    if (confirm(`Are you sure you want to delete the group ${group.group_name}?`)) {
      this.investmentGroups.forEach((grp, index) => {
        if (grp === group) {
          const data = {
            group_name: grp.group_name
          };
          this.isLoading = true;
          this.investmentService.deleteInvestmentGroup(data).subscribe(group => {
            if (group && group.success) {
              this.toastrService.success('Investment group deleted successfully');
            } else {
              this.toastrService.error('There was an issue deleting this group... Try again later');
            }
            this.isLoading = false;
          });
          return this.investmentGroups.splice(index, 1);
        }
      });
  } else {
    return this.investmentGroups;
  }
  }

  getInvestments() {
    this.investmentService.getInvestments(false).subscribe(investments => {
      if (investments) {
        this.investments = investments.success.Data;
      }
      this.isLoading = false;
    });
  }

  saveToGroup() {
    if (!this.selectedGroup && this.selectedValue.length === 0) {
      this.toastrService.info('Please select an Investment Group and investment(s) to be added to the group');
    } else {
      this.isLoading = true;
      const group = this.selectedGroup;
      const groupId = [];
      const data: any = {
        group_name: group,
      };
      this.selectedValue.forEach(investment => {
        this.group_id = investment.id;
        groupId.push(this.group_id);
      });
      this.investmentService.addInvestmentsToGroup(data, groupId.toString()).subscribe(async result => {
        if (await result) {
          this.toastrService.success('Investments successfully added to selected group');
          this.isLoading = false;
          window.location.reload();
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
