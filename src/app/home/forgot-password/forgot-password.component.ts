import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private customerService:CustomerService,private router:Router) { }
  
  invalidPassword=false;
  user;
  //binding variable for password
  pass="";

  forgotPasswordForm:FormGroup;
  users;
  ngOnInit(): void {
    //initializing validators
    this. forgotPasswordForm = new FormGroup({
      'username': new FormControl('',[Validators.required]),
      'dateOfBirth': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required,Validators.minLength(6)]),
      'confirmPassword': new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  this.customerService.getAllUsernames().subscribe(res=>{
    this.users=res;
  });
  }

  buttonValid=false;

  //checking password and confirm password
  checkPassword(value)
  {
    value!=this.pass?this.invalidPassword=true:this.invalidPassword=false;
    this.buttonValid=this.invalidPassword||this.invalidUser;
  }

  //checking username available
  invalidUser=false;
  
  checkUsername(value){
    this.users.some(u=>u===value)?this.invalidUser=false:this.invalidUser=true;
    this.buttonValid=this.invalidPassword||this.invalidUser;
  }


  changePasswordSuccess=false;
  invalid=false;

  //Forgot Password
  forgotPassword()
  {
    this.user=this.customerService.ForgotPassword(this.forgotPasswordForm.value.username,this.forgotPasswordForm.value.dateOfBirth
      ,this.forgotPasswordForm.value.password)
      .subscribe(success=>{
        if(!success){
          this.invalid=true;
          this.changePasswordSuccess=false;
        }
        else{
          this.changePasswordSuccess=true;
          this.invalid=false;
        }
        this.forgotPasswordForm.reset();
        this.router.navigateByUrl("/forgot-password");
      })
      ;

  }
}
