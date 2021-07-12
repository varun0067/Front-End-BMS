import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationPageComponent } from 'src/app/home/registration-page/registration-page.component';

import { DatePipe } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { UpdateAccountComponent } from 'src/app/customer-dashboard/update-account/update-account.component';
import { ApplyLoanComponent } from 'src/app/customer-dashboard/apply-loan/apply-loan.component';
import { NavBarComponent } from 'src/app/home/nav-bar/nav-bar.component';
import { NavBarLoginComponent } from 'src/app/customer-dashboard/nav-bar-login/nav-bar-login.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { LoanDetailsComponent } from 'src/app/customer-dashboard/loan-details/loan-details.component';
import { ChangePasswordComponent } from 'src/app/customer-dashboard/change-password/change-password.component';
import { CustomerService } from './services/CustomerService/customer.service';
import { LoanService } from './services/LoanService/loan.service';
import { RouteResolver } from './Resolver/route.resolver';
import { AuthGuard } from './Auth-guard/auth.guard';
import { AuthService } from './services/AuthService/auth.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationPageComponent,
    CustomerDashboardComponent,
    UpdateAccountComponent,
    ApplyLoanComponent,
    NavBarComponent,
    NavBarLoginComponent,
    ForgotPasswordComponent,
    LoanDetailsComponent,
    ChangePasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DatePipe,
    CustomerService,
    LoanService,
    RouteResolver,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
