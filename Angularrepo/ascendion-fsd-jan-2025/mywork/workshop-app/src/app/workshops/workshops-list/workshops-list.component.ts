import { Component, OnInit } from '@angular/core';
import { IWorkshop } from '../models/IWorkshop';
import { WorkshopsService } from '../workshops.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSpinnerComponent } from "../../common/loading-spinner/loading-spinner.component";
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import { ItemComponent } from './item/item.component';
import { PaginationComponent } from '../../common/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../common/toast.service';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [NgbAlert, LoadingSpinnerComponent,ErrorAlertComponent,ItemComponent,PaginationComponent,FormsModule],
  templateUrl: './workshops-list.component.html',
  styleUrl: './workshops-list.component.scss'
})
export class WorkshopsListComponent implements OnInit {
  loading = true;
  error: Error | null = null;
  workshops!: IWorkshop[];
  page: number = 1;
  filterKey = '';
  filteredWorkshops!: IWorkshop[];

  // This is how you might create a service instance without DI - but we do not prefer this (good practice).
  // w : WorkshopService
  // w = new WorkshopsService();

  // Dependency Injection -> The dependency, i.e. WorkshopsService object is given to this component when the object is created by Angular
  constructor(private w: WorkshopsService, private activatedroute: ActivatedRoute, private router: Router, private toastService: ToastService) {
    // this.w = w;
  }

  getWorkshops(){
    this.loading = true;
    this.w.getWorkshops(this.page).subscribe({
      next: (data) => {
        console.log(data);
        this.workshops = data;
        this.filteredWorkshops = this.workshops;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    })
  }

  deleteWorkshop(workshop: IWorkshop) {
    console.log(workshop);

    this.w.deleteWorkshopById(workshop.id).subscribe({
        next: () => {
            this.toastService.add({
                message: `Deleted workshop with id = ${workshop.id}`,
                className: 'bg-success text-light',
                duration: 5000,
            });
            // update this.workshops
            this.workshops = this.workshops.filter(
                (w) => w.id !== workshop.id
            );
        },
        error: () => {
            this.toastService.add({
                message: `Could not delete workshop with id = ${workshop.id}`,
                className: 'bg-danger text-light',
                duration: 5000,
            });
        },
    });
    this.filteredWorkshops=this.workshops;
}
  

  public ngOnInit() {
    // console.log(this.w);
    // this.w.getWorkshops(this.page).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.workshops = data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.error = err;
    //     this.loading = false;
    //   },
    // })
    this.activatedroute.queryParamMap.subscribe({
      next:(queryParams)=>{
        const queryStr = queryParams.get('page');
        if(queryStr===null){
          this.page=1;
        }else{
          this.page=+queryStr;
        }
        this.getWorkshops();
      }
    })
  }
  
  ngOnDestroy() {
    console.log('WorkshopsListComponent destroyed');
  }

  changePage(newPage: number) {
    this.page = newPage;

    // set the query string in the route
    this.router.navigate(['/workshops'], {
        queryParams: {
            page: this.page,
        },
    });
}
  filterWorkshops() {
    this.filteredWorkshops = this.workshops.filter((w) =>
        w.name.toLowerCase().includes(this.filterKey.toLowerCase())
    );
}

filterByCategory(category: string) {
  this.w.getWorkshops(this.page, category).subscribe({
      next: (workshops) => {
          this.workshops = workshops;
          // A better alternative: If you make `this.workshops` and `this.filterKey` as signals, you can compute `this.filteredWorkshops` automatically when either `this.workshops` changes or `this.filterKey` changes
          this.filterWorkshops();
      },
  });
}
}