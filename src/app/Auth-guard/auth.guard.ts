import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CustomerService } from '../services/CustomerService/customer.service'
import { AuthService } from '../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
    private router:Router){

    }

    canActivate():boolean{
      if(this.authService.LoggedIn()){
        return true;
      }
      else{
        alert("Please login!!");
        this.router.navigateByUrl("");
        return false;
      }
    }
}
