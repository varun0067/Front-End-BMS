import { TestBed } from '@angular/core/testing';

import { LoanService } from './loan.service';
import { educationLoan } from 'src/app/models/education-loan.model';
import { personalHomeLoan } from 'src/app/models/personal-home-loan.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule],
    });
    service = TestBed.inject(LoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
