type StudentVerificationPurpose = 'admission' | 'scholarship' | 'job' | string;
export const expirationDate: {[purpose: StudentVerificationPurpose]: number} = { // given in days
    'admission': 30,
    'scholarship': 90,
    'job': 180,
    default: 30
};

export interface IStudentVerification {
    name: string,
    studentId: string,
    dob: string,
    program: string,
    faculty: string,
    status: string,
    enrolmentYear: string,
    gender: string,
    schoolName: string,

    purpose: StudentVerificationPurpose,
    exprDate: string,
    grantDate: string // today: dd-mm-yyyy
}

export default {
    getStudentVerifPpworkExpDate: (purpose: StudentVerificationPurpose): string => {
        const exprDate = new Date();
        exprDate.setDate(exprDate.getDate() + (expirationDate[purpose] || expirationDate.default));
        return `${exprDate.getDate()}-${exprDate.getMonth() + 1}-${exprDate.getFullYear()}`;
    }
}