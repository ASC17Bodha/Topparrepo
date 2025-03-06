import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListissuesComponent } from "./listissues/listissues.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { UpdateIssueComponent } from "./update-issue/update-issue.component";
import { AddIssueComponent } from "./add-issue/add-issue.component";

@NgModule({
    declarations:[AppComponent,NavbarComponent,HomeComponent,LoginComponent,ListissuesComponent,UpdateIssueComponent,AddIssueComponent],
    imports:[HttpClientModule,BrowserModule,AppRoutingModule,RouterModule,RouterOutlet,ReactiveFormsModule,FormsModule],
    bootstrap:[AppComponent]
})

export class AppModule{

}