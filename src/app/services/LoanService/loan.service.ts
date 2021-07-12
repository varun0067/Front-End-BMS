import { Injectable } from '@angular/core';
import { educationLoan } from '../../models/education-loan.model';
import { personalHomeLoan } from '../../models/personal-home-loan.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { mapTo, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  custId;
  constructor(private http:HttpClient) { 
    
  }

  
  
  //add education loan details
  educationLoanAdd(loan:educationLoan)
  {
    let httpHeaders=new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem("jwt")
    });

    return this.http.post(environment.loanApiURL+'addEducationLoan',loan,{headers:httpHeaders})
    .pipe(
      mapTo(true),
      catchError(error=>{
        alert(error.error);
        return of(false);
      })
    );
  }

  //add personal home loan details
  personalHomeLoanAdd(loan:personalHomeLoan)
  {
    let httpHeaders=new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem("jwt")
    });
    return this.http.post(environment.loanApiURL+'addPersonalLoan',loan,{headers:httpHeaders})
    .pipe(
      mapTo(true),
      catchError(error=>{
        alert(error.error);
        return of(false);
      })
    );
  }

  //get education loan details of a particular user
  getEduactionLoanDetails()
  {
    let httpHeaders=new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem("jwt")
    });

    this.custId=sessionStorage.getItem("custId");
    return this.http.get(environment.loanApiURL+'getEducationLoans/'+this.custId,{headers:httpHeaders});
  }

  //get personal loan details of a particular user
  getPersonalLoanDetails()
  {
    let httpHeaders=new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem("jwt")
    });
    this.custId=sessionStorage.getItem("custId");
    return this.http.get(environment.loanApiURL+'getPersonalLoans/'+this.custId,{headers:httpHeaders});
  }
}
// using ApplyLoanService.Models;
// using ApplyLoanService.Repository;
// using ApplyLoanService.Services;
// using Moq;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Text;
// using System.Threading.Tasks;
// using Xunit;

// namespace ApplyLoanUnitTest
// {
//    public  class LoanServiceUnitTest
//     {
//         private Mock<ILoanRepository> mock;
//         private LoanService service;
//         private LoanDetails loanDetails;

//         public LoanServiceUnitTest()
//         {
//             mock = new Mock<ILoanRepository>();
//             service = new LoanService(mock.Object);
            // loanDetails = new LoanDetails()
            // {
            //     id = 1,
            //     CustomerId = "R-111",
            //     LoanType = "Educational",
            //     LoanAmount = 1000000,
            //     LoanIssueDate = new DateTime(2021, 12, 23),
            //     RateOfInterest = 10,
            //     LoanDuration = 15,
            //     FatherName = "Ramesh",
            //     Course = "BE",
            //     CourseFee = 100000,
            //     FatherOccupation = "HR",
            //     FatherTotalExperience = 5,
            //     FatherExperienceWithCurrentComapany = 2,
            //     RationCardNumber = "ASD12345D",
            //     FatherAnnualIncomme = 10000,
            //     CompanyName = "Cognizant",
            //     AnnualIncomme = 1000000,
            //     Designation = "PAT",
            //     TotalExperience = 4,
            //     ExperienceWithCurrentComapany = 2

            // };
//         }
//         [Fact]
//         public void AddLoanDetails_ValidInput_ReturnsLoanDetailsAdded()
//         {
//             mock.Setup(p => p.Add(loanDetails)).Returns("Loan Details Added");
//             var result = service.AddLoanDetails(loanDetails);
//             Assert.Equal("Loan Details Added", result);

//         }
//         [Fact]
//         public void GetDetails_ValidData_ReturnsListOfLaonDetails()
//         {
//             List<LoanDetails> list = new List<LoanDetails>();
//             list.Add(loanDetails);
//             mock.Setup(p => p.getLoanDetails("R-111")).Returns(list);
//             var result = service.getDetails("R-111");
//             Assert.Equal(list,result);

//         }
//     }
// }


// public class ShoppingCartControllerTest
// {
//     ShoppingCartController _controller;
//     IShoppingCartService _service;

//     public ShoppingCartControllerTest()
//     {
//         _service = new ShoppingCartServiceFake();
//         _controller = new ShoppingCartController(_service);
//     }

//     [Fact]
//     public void Get_WhenCalled_ReturnsOkResult()
//     {
//         // Act
//         var okResult = _controller.Get();

//         // Assert
//         Assert.IsType<OkObjectResult>(okResult.Result);
//     }

//     [Fact]
//     public void Get_WhenCalled_ReturnsAllItems()
//     {
//         // Act
//         var okResult = _controller.Get().Result as OkObjectResult;

//         // Assert
//         var items = Assert.IsType<List<ShoppingItem>>(okResult.Value);
//         Assert.Equal(3, items.Count);
//     }
// }