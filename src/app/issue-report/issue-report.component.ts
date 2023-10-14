import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() formClose = new EventEmitter();

  suggestions: Issue[] = [];

  constructor(private issueService: IssuesService){}

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe(title => {
      this.suggestions = this.issueService.getSuggestions(title);
    })
  }

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    description: new FormControl('', { nonNullable: true}),
    priority: new FormControl('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  addIssue() {
    if(this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched(); // dopiero przy dodawaniu błędu zaznaczamy kontrolki jako invalid
      return;
    }
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }

}
