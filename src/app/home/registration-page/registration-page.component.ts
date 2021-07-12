import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { DatePipe } from '@angular/common'
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private router:Router,public datepipe:DatePipe,private customerService:CustomerService) { }

  registrationForm:FormGroup;
  Usernames:string[];
  ngOnInit(): void {
      //initializing validations
      this.registrationForm  = new FormGroup({
      'name': new FormControl('',[Validators.required,Validators.pattern(/^[a-z ]+$/i)]),
      'email': new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)]),
      'contactNumber': new FormControl('',[Validators.required,Validators.pattern(/^[6-9][0-9]{9}$/i)]),
      'username': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required,Validators.minLength(6)]),
      'gender': new FormControl('',[Validators.required]),
      'dateOfBirth': new FormControl('',[Validators.required]),
      'maritalStatus': new FormControl('',[Validators.required]),
      'guardianType': new FormControl('',[Validators.required]),
      'guardianName': new FormControl('',[Validators.required]),
      'address': new FormControl('',[Validators.required]),
      'citizenship': new FormControl('',[Validators.required]),
      'country': new FormControl('',[Validators.required]),
      'state': new FormControl('',[Validators.required]),
      'accountType': new FormControl('',[Validators.required]),
      'branchName': new FormControl('',[Validators.required]),
      'identificationType': new FormControl('',[Validators.required]),
      'identificationDocumentNumber': new FormControl('',[Validators.required]),
      'referenceAccountHolderName': new FormControl('',[Validators.required]),
      'referenceAccountHolderAccountNumber': new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{16}$/)]),
      'referenceAccountHolderAddress': new FormControl('',[Validators.required]),
      'initialDepositAmount': new FormControl('',[Validators.required]),
      'registrationDate': new FormControl({value:this.registrationDate,disabled:true},[Validators.required])
  });

  this.customerService.getAllUsernames().subscribe(res=>{
    this.Usernames=res;
  }
  );
  }

  //variable declarations to set minimum and maximum date of birth between (18 and 96)
  today = new Date();
  minDate = new Date(this.today.getFullYear() - 96, this.today.getMonth(), this.today.getDate());
  maxDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  senior = new Date(this.today.getFullYear() - 60, this.today.getMonth(), this.today.getDate());

  //registration date biding variable
  registrationDate = this.datepipe.transform(this.today, 'yyyy-MM-dd');
  seniorMaxDate = this.datepipe.transform(this.senior, 'yyyy-MM-dd');

  //fuction to get random number between range
  getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  //array of random numbers between range
  createArrayOfNumbers(start,end)
  {
    let array=[];

    for(let i=start;i<=end;i++)
    {
      array.push(i);
    }
    return array;
  }

  //different random numbers getting array
  customerIdArray=this.createArrayOfNumbers(100,999);

  //getting random index to get the elememt from customerIdArray
  randomCustIndex=this.getRandomNumber(0,this.customerIdArray.length-1);

  //retriving random customer Id
  RandomCustNumber=this.customerIdArray[this.randomCustIndex];
  n=this.customerIdArray.splice(this.randomCustIndex,1);


  CustomerId="R-"+this.RandomCustNumber;
  RandomAccNumber=this.getRandomNumber(1000000000000000,9999999999999999);

  //identification number drop down
  idenTypePAN=false;
  idenTypeAadhar=false;
  dropIdenNumber(value)
  {
    if(value==="PAN")
    {
      this.idenTypePAN=true;
      this.idenTypeAadhar=false;
    }
    else
    {
      this.idenTypeAadhar=true;
      this.idenTypePAN=false;
    }
  }

  buttonInvalid=true;

  //username validation
 

  //to check on input if username already exixts
  invalidUsername=false;
  CheckUserName(value){
    (this.Usernames.some(u=>u===value))?this.invalidUsername=true:this.invalidUsername=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar
    ||this.invalidInitialAmount;
  }


  //PAN validation
  invalidPAN=false;
  CheckPAN(value){
    (!/^[A-Z0-9]{12}$/.test(value))?this.invalidPAN=true:this.invalidPAN=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar
    ||this.invalidInitialAmount;
  }

  //Aadhar validation
  invalidAadhar=false;
  CheckAadhar(value){
    (!/^[0-9]{12}$/.test(value))?this.invalidAadhar=true:this.invalidAadhar=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar
    ||this.invalidInitialAmount;
  }


  //citizenstatus setting
  citizenStatus = "";
  seniordate;
  CitizenStatus(value)
  {
    this.seniordate = new Date(<number>value.slice(0,4),<number>value.slice(5,2),<number>value.slice(8,2));
    this.seniordate< this.senior?this.citizenStatus = "senior":this.citizenStatus = "adult";
  }

  //initialdeposit 
  initialDepositAmount = "0";
  minAmount=0;
  AccouuntType(value)
  {
    value==="saving"?this.minAmount=5000:this.minAmount=0;
  }
  
  //checking initial deposit is greaterthan or equal to minAmount
  invalidInitialAmount=false;
  CheckAmount(value){
    (value<this.minAmount)?this.invalidInitialAmount=true:this.invalidInitialAmount=false;
    this.buttonInvalid=this.invalidUsername||this.invalidPAN||this.invalidAadhar
    ||this.invalidInitialAmount;
  }

  registrationSuccess=false;
  newaccount:Account;

  //onSubmit Register
  register() {

    this.newaccount = new Account(
      this.CustomerId,
      this.RandomAccNumber,
      this.registrationForm.value.name,
      this.registrationForm.value.username,
      this.registrationForm.value.password,
      this.registrationForm.value.guardianType,
      this.registrationForm.value.guardianName,
      this.registrationForm.value.address,
      this.registrationForm.value.citizenship,
      this.registrationForm.value.state,
      this.registrationForm.value.country,
      this.registrationForm.value.email,
      this.registrationForm.value.gender,
      this.registrationForm.value.maritalStatus,
      this.registrationForm.value.contactNumber,
      this.registrationForm.value.dateOfBirth,
      this.today,
      this.registrationForm.value.accountType,
      this.registrationForm.value.branchName,
      this.citizenStatus,
      this.registrationForm.value.initialDepositAmount,
      this.registrationForm.value.identificationType,
      this.registrationForm.value.identificationDocumentNumber,
      this.registrationForm.value.referenceAccountHolderName,
      this.registrationForm.value.referenceAccountHolderAccountNumber,
      this.registrationForm.value.referenceAccountHolderAddress
    );
  
      this.customerService.Register(this.newaccount).subscribe(res=>{
        if(res){
          this.registrationSuccess=true; 
        }
        this.registrationForm.reset();  
        this.router.navigateByUrl("/registration-page");
      });

      
    }
}


