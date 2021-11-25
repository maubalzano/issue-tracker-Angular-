import { Component, OnInit } from '@angular/core';
import { IssuesService } from './../issues.service';
import { Issue } from './../issue'

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  issues!: Issue[];

  showReportIssue: boolean = false;
  selectedIssue: Issue | null = null;
  issueToEdit: Issue | null = null;

  constructor(private issueService: IssuesService) { }

  getIssues(){
    this.issues = this.issueService.getPendingIssues()
  }

  ngOnInit(): void {
    this.getIssues()
  }

  onCloseReport(){
    this.showReportIssue = false;
    this.getIssues()
  }

  onConfirm(confirmed: boolean){
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null
  }

  onCloseEdit(){
    this.issueToEdit = null;
    this.getIssues()
  }
}
