import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private customerService:CustomerService,private router:Router) { }

  changePasswordForm:FormGroup;
  ngOnInit(): void {
    //initializing validators
    this.changePasswordForm  = new FormGroup({
      'oldPassword': new FormControl('',[Validators.required]),
      'newPassword': new FormControl('',[Validators.required,Validators.minLength(6)]),
      'confirmPassword': new FormControl('',[Validators.required,Validators.minLength(6)])
  });
  }

  newPass="";
  invalidPassword=false;
  user;
  checkNewPassword(value){
    value!=this.newPass?this.invalidPassword=true:this.invalidPassword=false;
  }


  PasswordInvalid=false;
  passwordChanged=false;
  //onSubmit changePassword
  changePassword(){
    this.user=this.customerService.ChangePassword(this.changePasswordForm.value.newPassword,this.changePasswordForm.value.oldPassword)
    .subscribe(success=>{
      if(!success)
      {
        this.PasswordInvalid=true;
        this.passwordChanged=false;
      }
      else{
        this.PasswordInvalid=false;
        this.passwordChanged=true;
      }
      this.changePasswordForm.reset();
      this.router.navigateByUrl("/change-password");
    });
  }
}
