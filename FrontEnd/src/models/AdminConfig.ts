export interface AdminConfig {
    phonenumberPattern: RegExp;
    emailPatterns: Array<RegExp>;
    deleteStudentSeconds: number;
    applyFlag: boolean;
    studentStatusPrecedences: {[id: number]: string}
}