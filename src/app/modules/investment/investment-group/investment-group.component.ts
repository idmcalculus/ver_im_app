import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../../../modal/modal.component';
import { InvestmentService } from '../investment.service';
import { Investment } from '../../../shared/models/Investment';
import { MatFormFieldControl } from '@angular/material';
import { Location } from '@angular/common';

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
              private investmentService: InvestmentService,
              private location: Location) {
                this.getInvestments();
              }

  ngOnInit() {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '900px';
    dialogConfig.data = {name: this.investmentGroupName};

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
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

  goBack() {
    this.location.back();
  }


}
