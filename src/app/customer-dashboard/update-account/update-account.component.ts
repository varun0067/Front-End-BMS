import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  acc:any;
  idenTypePAN=false;
  idenTypeAadhar=false;
  
  constructor(private customerService:CustomerService,private router:Router,public datepipe:DatePipe,private activatedRoute:ActivatedRoute) {
    
   }
  
  customerId=sessionStorage.getItem("custId");
  citizenStatus;

  updateForm:FormGroup;
  Usernames:string[];
  ngOnInit(): void {

    this.activatedRoute.data.subscribe(account=>{
      this.acc=account;
    })


    this.customerService.getAllUsernames().subscribe(res=>{
      this.Usernames=res;
    });

    this.acc.data?.identificationType==="PAN"?this.idenTypePAN=true:this.idenTypeAadhar=true;
    this.citizenStatus = this.acc.data?.citizenStatus;

    //initializing validations
    this.updateForm  = new FormGroup({
      'customerId': new FormControl({value:this.acc.data?.customerId,disabled:true},[Validators.required]),
      'accountNumber': new FormControl({value:this.acc.data?.accountNumber,disabled:true},[Validators.required]),
      'name': new FormControl({value:this.acc.data?.name,disabled:false},[Validators.required,Validators.pattern(/^[a-z ]+$/i)]),
      'email': new FormControl({value:this.acc.data?.email,disabled:false},[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)]),
      'contactNumber': new FormControl({value:this.acc.data?.contactNumber,disabled:false},[Validators.required,Validators.pattern(/^[6-9][0-9]{9}$/i)]),
      'username': new FormControl({value:this.acc.data?.username,disabled:false},[Validators.required]),
      'gender': new FormControl({value:this.acc.data?.gender,disabled:false},[Validators.required]),
      'dateOfBirth': new FormControl({value:(this.acc.data?.dateOfBirth)?.slice(0,10),disabled:false},[Validators.required]),
      'maritalStatus': new FormControl({value:this.acc.data?.maritalStatus,disabled:false},[Validators.required]),
      'guardianType': new FormControl({value:this.acc.data?.guardianType,disabled:false},[Validators.required]),
      'guardianName': new FormControl({value:this.acc.data?.guardianName,disabled:false},[Validators.required]),
      'address': new FormControl({value:this.acc.data?.address,disabled:false},[Validators.required]),
      'citizenship': new FormControl({value:this.acc.data?.citizenship,disabled:false},[Validators.required]),
      'country': new FormControl({value:this.acc.data?.country,disabled:false},[Validators.required]),
      'state': new FormControl({value:this.acc.data?.state,disabled:false},[Validators.required]),
      'accountType': new FormControl({value:this.acc.data?.accountType,disabled:false},[Validators.required]),
      'branchName': new FormControl({value:this.acc.data?.branchName,disabled:false},[Validators.required]),
      'identificationType': new FormControl({value:this.acc.data?.identificationType,disabled:true},[Validators.required]),
      'identificationDocumentNumber': new FormControl({value:this.acc.data?.identificationDocumentNumber,disabled:false},[Validators.required]),
      'referenceAccountHolderName': new FormControl({value:this.acc.data?.referenceAccountHolderName,disabled:false},[Validators.required]),
      'referenceAccountHolderAccountNumber': new FormControl({value:this.acc.data?.referenceAccountHolderAccountNumber,disabled:false},[Validators.required,Validators.pattern(/^[0-9]{16}$/)]),
      'referenceAccountHolderAddress': new FormControl({value:this.acc.data?.referenceAccountHolderAddress,disabled:false},[Validators.required]),
      'citizenStatus': new FormControl({value:this.acc.data?.citizenStatus,disabled:true},[Validators.required])  
  });

  }

  today = new Date();
  minDate = new Date(this.today.getFullYear() - 96, this.today.getMonth(), this.today.getDate());
  maxDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  senior = new Date(this.today.getFullYear() - 60, this.today.getMonth(), this.today.getDate());

  registrationDate = this.datepipe.transform(this.today, 'yyyy-MM-dd');
  seniorMaxDate = this.datepipe.transform(this.senior, 'yyyy-MM-dd');


  buttonInvalid=false;

  //username validation
  
  invalidUsername=false;
  CheckUserName(value){
    (this.Usernames.some(u=>u===value))?this.invalidUsername=true:this.invalidUsername=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar;
  }


  //PAN validation
  invalidPAN=false;
  CheckPAN(value){
    (!/^[A-Z0-9]{12}$/.test(value))?this.invalidPAN=true:this.invalidPAN=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar;
  }

  //Aadhar validation
  invalidAadhar=false;
  CheckAadhar(value){
    (!/^[0-9]{12}$/.test(value))?this.invalidAadhar=true:this.invalidAadhar=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar;
  }


  //citizenstatus setting
  CitizenStatus(value)
  {
    value< this.senior?this.citizenStatus = "senior":this.citizenStatus = "adult";
  }


  updateSuccess=false;

  //onSubmit updateDetails
  updateDetails() {
    this.updateForm.value.customerId=this.acc.data.customerId;
    this.updateForm.value.citizenStatus=this.citizenStatus;
    this.updateForm.value.identificationType=this.acc.data.identificationType;
    this.customerService.UpdateUser(this.updateForm.value).subscribe(res=>{
      if(res){
        this.updateSuccess=true;
      }
      this.updateForm.reset();
      this.router.navigateByUrl("/update-account");
    });
    }
}
