import { axiosJson } from "../../config/axios";
import outputMD from "../../utils/outputMD";
import outputHTML from "../../utils/outputHTML";
import outputPDF from "../../utils/outputPDF";

async function fetchStudentVerificationPaperwork(studentId: string, purpose: string) {
    const {data} = await axiosJson
        .get(`services/students/verification-paperwork?id=${studentId}&purpose=${purpose}`);

    return {...data.info}
}

export async function handleStudentVerificationPaperwork(studentId: string, purpose: string, template: string, fileType: string = 'md') {
    try {
        const data = await fetchStudentVerificationPaperwork(studentId, purpose);

        let fileContent: any;
        let contentType: string = '';
        switch (fileType) {
            case 'md':
                fileContent = outputMD(data, template)
                contentType = 'text'
                break;
            case 'html':
                fileContent = await outputHTML(data, template)
                contentType = 'text'
                break;
            case 'pdf':
                fileContent = await outputPDF(data, template)
                contentType = 'application'
                break;
            default:
                return;
        }
    
        const fileName = `${studentId}.${fileType}`
    
        const blob = new Blob([fileContent], { type: `${contentType}/${fileType}` });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (e) {
        alert(e)
        return;
    }
}