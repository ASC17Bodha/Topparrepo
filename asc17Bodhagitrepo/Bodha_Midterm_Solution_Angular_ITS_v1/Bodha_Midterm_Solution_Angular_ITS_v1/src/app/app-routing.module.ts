import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ListissuesComponent } from "./listissues/listissues.component";
import { AuthGuardService } from "./services/authguard.service";
import { UpdateIssueComponent } from "./update-issue/update-issue.component";
import { AddIssueComponent } from "./add-issue/add-issue.component";


const routes:Routes=[
    {path:'',component:HomeComponent},
    {path:'Login',component:LoginComponent},
    {path:'update/:issueId',component:UpdateIssueComponent},
    {path:'addissue',component:AddIssueComponent},
    {path:'Issues',component:ListissuesComponent,canActivate:[AuthGuardService]},
    {path:'**',component:LoginComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    bootstrap:[AppComponent]
})

export class AppRoutingModule{
     
}