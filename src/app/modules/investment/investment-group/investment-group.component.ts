import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../../../modal/modal.component';
import { InvestmentService } from '../investment.service';
import { Investment } from '../../../shared/models/Investment';
import { MatFormFieldControl } from '@angular/material';

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
  investmentGroups = new FormControl();
  investmentGroupNames = new FormControl();
  investmentGroupName: string;
  investments: Investment[] = [];

  constructor(public matDialog: MatDialog,
              private investmentService: InvestmentService) {
                this.getInvestments();
              }

  ngOnInit() {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '900px';
    dialogConfig.data = {name: this.investmentGroupName};
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.investmentGroupName = result;
    });
  }

  getInvestments() {
    this.investmentService.getInvestments(false).subscribe(investments => {
      if (investments) {
        this.investments = investments.success.Data;
        console.log(this.investments);
      }
      this.isLoading = false;
    });
  }

}
