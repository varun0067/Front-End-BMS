import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/CustomerService/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-login',
  templateUrl: './nav-bar-login.component.html',
  styleUrls: ['./nav-bar-login.component.css']
})
export class NavBarLoginComponent implements OnInit {

  constructor(private router:Router) { }


  ngOnInit(): void {

  }

  //logout
  logout()
  {
    sessionStorage.setItem("custId","");
    sessionStorage.setItem("jwt","");
    this.router.navigateByUrl("/");
  }

}
