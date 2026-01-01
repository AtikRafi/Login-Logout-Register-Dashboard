import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './Shared/auth.guard';
import { AdminOnlyComponent } from './AuthorizieDemo/admin-only/admin-only.component';
import { StoreOwnerComponent } from './AuthorizieDemo/store-owner/store-owner.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { claimReq } from './Shared/utils/claimReq-utils';
import { CustomerComponent } from './AuthorizieDemo/customer/customer.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/signin', pathMatch: 'full'
    },
    {
        path: '', component: UserComponent,
        children: [
            { path: 'signup', component: RegistrationComponent },
            { path: 'signin', component: LogInComponent },
        ]
    }, 
    {
        path: '', component: MainLayoutComponent, canActivate:[authGuard],
        canActivateChild:[authGuard],
        children: [
            {
                path: "dashboard", component: DashboardComponent
            },
            {
                path: "admin-only", component: AdminOnlyComponent,
                data: { claimReq: claimReq.adminOnly }
            },
            {
                path: "Store-owner", component: StoreOwnerComponent,
                data: { claimReq: claimReq.storeOwner }
            },
            {
                path: "customer", component: CustomerComponent,
                data: { claimReq: claimReq.customer }
            },
            {
                path: "forbidden", component: ForbiddenComponent,
                
            }
        ]
    }


];
