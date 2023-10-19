import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];

  showReportIssue = false;

  selectedIssue: Issue | null = null;

  updatedIssue: Issue | null = null;

  constructor(private issueService: IssuesService) { }

  ngOnInit(): void {
    this.getIssues();
  }

  openForm(issue: Issue) {
    this.updatedIssue = issue;
    this.showReportIssue = true;
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.updatedIssue = null;
    this.getIssues();
  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  onConfirm(confirmed: boolean) {
    if(confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }

}
