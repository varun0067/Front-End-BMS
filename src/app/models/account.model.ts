export class Account {

    constructor(
         public CustomerId: string,
         public AccountNumber: number,
         public Name: string,
         public Username: string,
         public Password: string,
         public GuardianType: string,
         public GuardianName: string,
         public Address: string,
         public Citizenship: string,
         public State: string,
         public Country: string,
         public Email: string,
         public Gender: string,
         public MaritalStatus: string,
         public ContactNumber: number,
         public DateOfBirth: Date,
         public RegistrationDate: Date,
         public AccountType: string,
         public BranchName: string,
         public CitizenStatus: string,
         public InitialDepositAmount: number,
         public IdentificationType: string,
         public IdentificationDocumentNumber: string,
         public ReferenceAccountHolderName: string,
         public ReferenceAccountHolderAccountNumber: number,
         public ReferenceAccountHolderAddress: string
    ) 
    { 
    }

}