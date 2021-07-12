import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/LoanService/loan.service';
import { educationLoan } from 'src/app/models/education-loan.model';
import { personalHomeLoan } from 'src/app/models/personal-home-loan.model';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {

  constructor(private loanService:LoanService) { }

  eduLoan:educationLoan[];
  perLoan:personalHomeLoan[];
  ngOnInit(): void {
    this.loanService.getEduactionLoanDetails().subscribe((edu:any)=>{
      this.eduLoan=edu;
    }
    );
    this.loanService.getPersonalLoanDetails().subscribe((per:any)=>{
      this.perLoan=per;
    });

  }

  

}
