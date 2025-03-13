import { axiosJson } from '../../config/axios'
import { FormEvent } from 'react'
// import { AdminConfig } from '../../models/AdminConfig';
export function dataOnSubmit(e: FormEvent, data: {[key: string]: any}): void {
    e.preventDefault();
    try {
        const dataToBeSent: {[key: string]: any} = {}
        if (data['ApplyFlag'] !== undefined) dataToBeSent.ApplyFlag = data['ApplyFlag']
        if (data['PhoneNumberPattern'] !== undefined) dataToBeSent.PhoneNumberPattern = data['PhoneNumberPattern']
        if (data['EmailPattern'] !== undefined) dataToBeSent.EmailPattern = data['EmailPattern']
        if (data['DeleteStudentSeconds'] !== undefined) dataToBeSent.DeleteStudentSeconds = data['DeleteStudentSeconds']
        if (data['StudentStatusPrecedences'] !== undefined) dataToBeSent.StudentStatusPrecedences = data['StudentStatusPrecedences']
        axiosJson
            .put('/adminConfig', dataToBeSent)
            .then(() => window.location.reload())
            .catch((err) => {
                console.error(err);
                alert(err)
            })
    } catch (err) {
        alert(err);
        return;
    }
}

export function fetchAdminConfig(setPhonenumberPattern: (state: string) => void,
        setEmailPattern: (state: string) => void,
        setDeleteStudentSeconds: (state: number) => void,
        setApplyFlag: (state: boolean) => void,
        setStudentStatusPrecedences: (state: number[]) => void
) {
    axiosJson
        .get('/adminConfig')
        .then((res) => {
            const data = {
                PhoneNumberPattern: res.data.PhoneNumberPattern,
                EmailPattern: res.data.EmailPattern,
                DeleteStudentSeconds: res.data.DeleteStudentSeconds,
                ApplyFlag: res.data.ApplyFlag,
                StudentStatusPrecedences: res.data.StudentStatusPrecedences
            }
            setPhonenumberPattern(data.PhoneNumberPattern? data.PhoneNumberPattern : '');
            setEmailPattern(data.EmailPattern? data.EmailPattern : '');
            setDeleteStudentSeconds(data.DeleteStudentSeconds? data.DeleteStudentSeconds : 0);
            setApplyFlag(typeof data.ApplyFlag === 'boolean' ? data.ApplyFlag : true);
            setStudentStatusPrecedences(data.StudentStatusPrecedences? data.StudentStatusPrecedences : []);
        })
        .catch((err) => {
            console.error(err);
            alert(err);
        });
}

export function removeConfig(field: string) {
    axiosJson
        .delete('/adminConfig?field=' + field)
        .then(() => window.location.reload())
        .catch((err) => {
            console.error(err);
            alert(err)
        });
}