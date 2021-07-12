import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { Account } from 'src/app/models/account.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule],
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
