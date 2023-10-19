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

  updateIssue(issue: Issue, issueNo: number) {
    console.log(issue);
    const index = this.issues.findIndex(i => i.issueNo === issueNo);
    issue.issueNo = issueNo;
    this.issues[index] = issue;
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = { // create a copy of actual issue
      ...issue, // get full object
      completed: new Date() // add new field to object
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue; // replace original issue with issue with completed value
  }

  getSuggestions(title: string): Issue[] {
    if(title.length > 3) {
      return this.issues.filter(issue => issue.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    }
    return [];
  }

}
