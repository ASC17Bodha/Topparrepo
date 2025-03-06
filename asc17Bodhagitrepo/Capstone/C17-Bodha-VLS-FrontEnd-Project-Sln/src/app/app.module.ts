import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LearnersComponent } from './components/learners/learners.component';
import { RegistrationsComponent } from './components/registrations/registrations.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { CoursesService } from './services/courses.service';
import { AuthorsService } from './services/authors.service';
import { LearnersService } from './services/learners.service';
import { RegistrationsService } from './services/registrations.service';
import { ReviewsService } from './services/reviews.service';
import { AuthorsComponent } from './components/authors/authors.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CoursesComponent,
    AuthorsComponent,
    LearnersComponent,
    RegistrationsComponent,
    ReviewsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    CoursesService,
    AuthorsService,
    LearnersService,
    RegistrationsService,
    ReviewsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
