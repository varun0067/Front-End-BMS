import { Injectable } from '@angular/core';
import { Account } from '../../models/account.model';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, mapTo,tap } from 'rxjs/operators';
import { AuthService } from '../AuthService/auth.service';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http:HttpClient,private authService:AuthService){

  }
    
  custId;

  getAccount()
  {
    return this.http.get<any>(environment.authorizationApiURL+'accounts');
  }

  //register user
  Register(account:Account){
    return this.http.post<string>(environment.authorizationApiURL+'register',account)
    .pipe(
      mapTo(true),
      catchError(error=>{
        alert(error.error);
        return of(false);
      })
    );
  }

  //Check Login
  Login(username:string,password:string)
  {

    return this.http.post<any>(environment.authorizationApiURL+'login',{"username":username,"password":password})
    .pipe(
      tap(token=>this.authService.setLoginUser(token.customerId,token.token)),
      mapTo(true),
      catchError(error=>{
        return of(false);
      })
    );
  }


  //get all usernames
  getAllUsernames()
  {
    return this.http.get<any>(environment.authorizationApiURL+'usernames');
  }

  //get User details of current login
  getUser()
  {
    this.custId=sessionStorage.getItem("custId");
    return this.http.get<any>(environment.authorizationApiURL+'accounts/'+this.custId);
  }

  //update user details
  UpdateUser(value)
  {
    let httpHeaders=new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem("jwt")
    });
    return this.http.put<string>(environment.authorizationApiURL+'update',value,{headers:httpHeaders})
    .pipe(
      mapTo(true),
      catchError(error=>{
        alert(error.error);
        return of(false);
      })
    );
  }
  

  //change current password
  ChangePassword(password,oldPassword){
    this.custId=sessionStorage.getItem("custId");

    let httpHeaders=new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem("jwt")
    });

    return this.http.put<any>(environment.authorizationApiURL+'changePassword',
    {"customerId":this.custId,"password":password,"oldPassword":oldPassword},{headers:httpHeaders})
    .pipe(
      mapTo(true),
      catchError(error=>{
        alert(error.error)
        return of(false);
      })
    );
  }

  //forgot password
  ForgotPassword(username,dateOfBirth,password){

    return this.http.put<any>(environment.authorizationApiURL+'forgotPassword',
    {"username":username,"dateOfBirth":dateOfBirth,"password":password})
    .pipe(
      mapTo(true),
      catchError(error=>{
        alert(error.error)
        return of(false);
      })
    );
  }

}


