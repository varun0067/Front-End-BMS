import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../services/CustomerService/customer.service';
import { Account } from '../models/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  invalidCredentials=false;
  loginForm: FormGroup;
  
  constructor(private router:Router,private customerService:CustomerService) {
   }

  ngOnInit() {
      //initializing validators
      this.loginForm  = new FormGroup({
      'username': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required])
      });
  }

  //To show and hide password field
  showPassword()
  {
    var id='password';
    var visible= <HTMLInputElement>document.getElementById(id);
    visible.type=="text"?visible.type="password":visible.type="text";
  }

  account:any;

  //onSubmit event login
  login() {

    this.customerService.Login(this.loginForm.value.username,this.loginForm.value.password)
    .subscribe(success=>{
      if(!success){
        this.invalidCredentials = true;
        this.router.navigateByUrl("/");
      }
      else{
        this.router.navigateByUrl("/customer-dashboard");
      }
    });

    }
}

