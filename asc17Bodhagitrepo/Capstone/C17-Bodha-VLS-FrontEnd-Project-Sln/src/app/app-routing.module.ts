import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { LearnersComponent } from './components/learners/learners.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

// Route definitions
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard] },
  { path: 'learners', component: LearnersComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: RegistrationsComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


