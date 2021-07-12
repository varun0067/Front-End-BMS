import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/CustomerService/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private customerService:CustomerService) { }

  acc:any;
  ngOnInit(): void {
    this.customerService.getUser().subscribe((res:any)=>{
      this.acc=res;
    });
  }


}
