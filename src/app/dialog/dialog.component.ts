import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>()

  name: string = '';
  email: string = '';
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.cancel.emit();
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.submit.emit({
      name: this.name,
      email: this.email,
      comment: this.comment
    });
    this.dialogRef.close();
  }
}
