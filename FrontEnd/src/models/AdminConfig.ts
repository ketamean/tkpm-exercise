export interface AdminConfig {
    PhoneNumberPattern: string | null,
    EmailPattern: string | null,
    DeleteStudentSeconds: number | null,
    ApplyFlag: boolean | null,
    StudentStatusPrecedences: number[] | null
}