import { Routes } from '@angular/router';
import { CreatemeetingComponent } from './meetings/createmeeting/createmeeting.component';
import { ShowmeetingComponent } from './meetings/showmeeting/showmeeting.component';
import { AddattendeesComponent } from './attendees/addattendees/addattendees.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        // component:CreatemeetingComponent,
        redirectTo: 'login',
        pathMatch: 'full',  
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'login-page' },
    },
    {
        path: 'register',
        component:AddattendeesComponent,
        title: 'Registration',
    },
    {
        path: 'showmeeting',
        component:ShowmeetingComponent,
        title: 'Meetings',
        canActivate:[AuthGuard]
    },
    {
        path: 'addmeeting',
        component:CreatemeetingComponent,
        title: 'Add Meeting',
        canActivate:[AuthGuard]
        }
            
];
