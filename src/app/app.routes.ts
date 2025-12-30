import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path:'', component: UserComponent,
        children:[
            {path:'signup', component:RegistrationComponent},
            {path:'signin', component:LogInComponent},
        ]
    },
    {path: "dashboard", component:DashboardComponent

    }
];
