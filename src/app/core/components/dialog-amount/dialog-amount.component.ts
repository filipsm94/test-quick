import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeamModel } from 'src/app/shared/models/state.model';

@Component({
  selector: 'app-dialog-amount',
  templateUrl: './dialog-amount.component.html',
})
export class DialogAmountComponent {
  amount = 0

  constructor(
    public dialogRef: MatDialogRef<DialogAmountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITeamModel,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
