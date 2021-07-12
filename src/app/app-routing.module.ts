import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationPageComponent } from './home/registration-page/registration-page.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AuthGuard } from './Auth-guard/auth.guard';
import { RouteResolver } from './Resolver/route.resolver';
import { UpdateAccountComponent } from './customer-dashboard/update-account/update-account.component';
import { ApplyLoanComponent } from './customer-dashboard/apply-loan/apply-loan.component';
import { LoanDetailsComponent } from './customer-dashboard/loan-details/loan-details.component';
import { ChangePasswordComponent } from './customer-dashboard/change-password/change-password.component';

const routes:Routes=[
    { path: '', component:HomeComponent},
    { path: 'registration-page', component: RegistrationPageComponent,},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'nav-bar', component: NavBarComponent},
    { path: 'customer-dashboard', component: CustomerDashboardComponent,canActivate:[AuthGuard]},
    { path: 'update-account', component: UpdateAccountComponent,resolve:{data:RouteResolver},canActivate:[AuthGuard]},
    { path: 'apply-loan', component: ApplyLoanComponent,canActivate:[AuthGuard]},
    { path: 'loan-details', component: LoanDetailsComponent,canActivate:[AuthGuard]},
    { path: 'change-password', component: ChangePasswordComponent,canActivate:[AuthGuard]}
  ]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }