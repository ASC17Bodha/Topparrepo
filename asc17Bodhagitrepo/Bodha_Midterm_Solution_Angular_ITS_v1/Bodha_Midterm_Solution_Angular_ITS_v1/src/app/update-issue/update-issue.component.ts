import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../models/issues.model';
import { IssueService } from '../services/issue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrl: './update-issue.component.css'
})
export class UpdateIssueComponent implements OnInit {
  id: number = 0;
  issue: Issue = new Issue();

  constructor(
    private issueService: IssueService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['issueId'];
    this.issue = new Issue();
    this.issueService.getIssueByID(this.id)
      .subscribe(
        searchIssue => {
          this.issue = searchIssue;
        },
        error => console.log(error)
      );
  }

  updateIssue(): void {
    this.issueService.updateIssue(this.id, this.issue)
      .subscribe(
        updatedIssue => {
          console.log(updatedIssue);
        },
        error => console.log(error)
      );
    this.router.navigate(['/Issues']);
    Swal.fire({
      icon: "success",
      title: "",
      text: "Issue Updated",
  });
  }
} 
