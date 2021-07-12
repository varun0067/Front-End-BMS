export class educationLoan{
    constructor(
        public customerId:string,
        public amount: number,
        public loanApplyDate: Date,
        public loanIssueDate: Date,
        public rateOfInterest: number,
        public durationOfLoan: string,
        public courseFee: number,
        public course:string,
        public fatherName: string,
        public fatherOccupation: string,
        public fatherTotalExperience: number,
        public fatherExperienceInCurrentCompany: number,
        public rationCardNumber:number,
        public annualIncome:number
    ){}
}