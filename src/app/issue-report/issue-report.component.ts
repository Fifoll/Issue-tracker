import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})

export class IssueReportComponent implements OnInit {

  @Input() updatedIssue: Issue | null = null;
  @Output() formClose = new EventEmitter();

  suggestions: Issue[] = [];

  constructor(private issueService: IssuesService){}

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe(title => {
      this.suggestions = this.issueService.getSuggestions(title);
    })
    if(this.updatedIssue) {
      this.issueForm.setValue({
        title: this.updatedIssue.title,
        description: this.updatedIssue.description,
        priority: this.updatedIssue.priority,
        type: this.updatedIssue.type
      })
    }
  }

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    description: new FormControl('', { nonNullable: true}),
    priority: new FormControl('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  submitForm() {
    if(this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched(); // dopiero przy dodawaniu błędu zaznaczamy kontrolki jako invalid
      return;
    }
    if(this.updatedIssue === null) {
      this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    }
    else {
      this.issueService.updateIssue(this.issueForm.getRawValue() as Issue, this.updatedIssue.issueNo); 
    }
    this.formClose.emit();
  }

}
