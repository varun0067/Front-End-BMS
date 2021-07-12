import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //setting session storage after successful login 
  setLoginUser(customerId:string,token:string)
  {
    sessionStorage.setItem("custId",customerId);
    sessionStorage.setItem("jwt",token);
  }

  //checking login
  LoggedIn()
  {
    return !!(sessionStorage.getItem("custId")&&sessionStorage.getItem("jwt"));
  }
}
