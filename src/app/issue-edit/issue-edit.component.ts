import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.scss']
})
export class IssueEditComponent implements OnInit {
  @Input() issue: Issue | null = null;
  @Output() closeEdit = new EventEmitter()

  issueEditForm: FormGroup | null = null;

  constructor(
    private builder: FormBuilder,
    private issueService: IssuesService
    ) { }

  applyEdit(){
    if (this.issueEditForm && this.issueEditForm.invalid) {
      this.issueEditForm.markAllAsTouched();
      return
    };
    const editedIssue: Issue = {
      ...this.issueEditForm?.value,
      issueNo: this.issue?.issueNo,
      type: this.issue?.type
    } 
    this.issueService.replaceIssue(editedIssue);
    this.closeEdit.emit();
  }

  ngOnInit(): void {
    if (this.issue) {
      this.issueEditForm = this.builder.group({
        title: [this.issue.title, Validators.required],
        description: [this.issue.description, Validators.required],
        priority: [this.issue.priority]
      });
    }
  }

}
