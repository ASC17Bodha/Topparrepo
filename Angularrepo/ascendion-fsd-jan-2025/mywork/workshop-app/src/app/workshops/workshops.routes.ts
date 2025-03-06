import { Routes } from "@angular/router";
import { WorkshopsListComponent } from "./workshops-list/workshops-list.component";
import { AddWorkshopComponent } from "./add-workshop/add-workshop.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { WorkshopDetailsComponent } from "./workshop-details/workshop-details.component";
import { SessionsListComponent } from "./workshop-details/sessions-list/sessions-list.component";
import { AddSessionComponent } from "./workshop-details/add-session/add-session.component";

export const workshoproutes:Routes=[
    {
        path:'workshops',
        component:WorkshopsListComponent,
        title:'workshoplist'
    },
    {
        path:'workshops/add',
        component:AddWorkshopComponent,
        title:'addworkshop'
    },
    {
        path:'workshops/favorites',
        component:FavoritesComponent,
        title:'favorites'
    },
    {
        path: 'workshops/edit/:id',
        component: AddWorkshopComponent,
        title: 'Edit a workshop',
    },
    {
        path:'workshops/:id',
        component:WorkshopDetailsComponent,
        title:'workshopdetails',
        children:[
            {
                path:'',
                component:SessionsListComponent,
                title:'sessionslist'
            },
            {
                path:'add-session',
                component:AddSessionComponent,
                title:'sessionslist'
            }
        ]
    },
]