
 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueService } from '../services/issue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrl: './add-issue.component.css'
})
export class AddIssueComponent implements OnInit {
  addIssueForm: FormGroup;
  id: number;

  constructor(private formBuilder: FormBuilder, private router: Router, private issueService: IssueService) { }

  ngOnInit(): void {
    this.addIssueForm = this.formBuilder.group({
      issueId: [''],
      title: [''],
      description: [''],
      priority: [''],
      status: [''],
      asignee: [''],
      date: [''],
      id: ['']
    });

   
    this.addIssueForm.get('issueId').valueChanges.subscribe(value => {
      this.addIssueForm.patchValue({
        id: value
      }, { emitEvent: false });
    });
  }

  onSubmit() {

    const formValue = this.addIssueForm.value;
    formValue.id = formValue.issueId;

    this.issueService.createIssue(formValue).subscribe(data => {
      Swal.fire({
        icon: "success",
        title: "",
        text: "Issue Created",
  });
      this.router.navigate(['/Issues']);
    });
  }
}

 
