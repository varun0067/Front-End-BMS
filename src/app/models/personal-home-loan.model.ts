export class personalHomeLoan{
    constructor(
        public customerId:string,
        public amount: number,
        public loanApplyDate: Date,
        public loanIssueDate: Date,
        public rateOfInterest: number,
        public durationOfLoan: string,
        public annualIncome: number,
        public companyName: string,
        public designation: string,
        public totalExperience: number,
        public experienceInCurrentCompany: number
    ){}
}