import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /***
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

   **/

}
