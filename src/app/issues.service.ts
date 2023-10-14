import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { issues } from '../assets/mock-issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = issues;

  constructor() { }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = { // create a copy of actual issue
      ...issue, // get full object
      completed: new Date() // add new field to object
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue; // replace original issue with issue with completed value
  }

}
