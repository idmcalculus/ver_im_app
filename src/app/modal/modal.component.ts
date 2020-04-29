import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  matDialogClose: MatDialogClose;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
