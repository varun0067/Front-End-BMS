import { Resolve } from "@angular/router";
import { of } from "rxjs";
import { Injectable } from '@angular/core';
import { CustomerService } from '../services/CustomerService/customer.service';

@Injectable()
export class RouteResolver implements Resolve<any>{
    constructor(private customerService:CustomerService){

    }

    resolve(){
        console.log("route Resolve");
        return this.customerService.getUser();
    }
}
