import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() issueNo: number | null = null; //get info about id of issue
  @Output() confirm = new EventEmitter<boolean>(); // emit event when confirm

  agree() {
    this.confirm.emit(true);
    this.issueNo = null; // hide dialog window
  }
  disagree() {
    this.confirm.emit(false);
    this.issueNo = null; // // hide dialog window
  }
}
