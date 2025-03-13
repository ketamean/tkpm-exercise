import { axiosJson } from "../../config/axios";
import { Student } from "../../models/Student";
import { MetadataState } from "./types";
export function handleAddStudentSubmit(data: FormData, setModalState: (state: boolean) => void) {
    axiosJson
        .post('/students', data)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function handleUpdateStudentSubmit(query: {[key: string]: any}, data: FormData, setModalState: (state: boolean) => void) {
    axiosJson
        .put(`/students?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}`).join('&')}`, data)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function handleDeleteStudentSubmit(query: {[key: string]: any}, setModalState: (state: boolean) => void) {
    axiosJson
        .delete(`/students?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

function sortStudentCompare(a: Student, b: Student): number {
    return a.id < b.id? -1: 1;
}

function handleFileExport(contentExtractor: (students: Student[]) => string, outputFileName: string) {

    axiosJson
        .get('/students/')
        .then(async (response) => {
            const students: Student[] = response.data.students.sort(sortStudentCompare);
            if (students.length === 0) {
                alert('No data to export');
                return;
            }            
            const fileContent = contentExtractor(students)
            const blob = new Blob([fileContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = outputFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        })
        .catch((error) => {
            console.error('There was an error exporting the data!', error);
        });
}

export function handleFileExportCSV() {
    handleFileExport(
        (students: Student[]) => Object.keys(students[0]).map((head) => String(head)).join(',') + '\n' + students.map((student) => Object.values(student).map((val) => String(val)).join(',')).join('\n'),
        'students.csv'
    )
}

export function handleFileExportJson() {
    handleFileExport(
        (students: Student[]) => JSON.stringify(students, null, 2),
        'students.json'
    )
}

function handleFileImport(data: any) {
    axiosJson
        .post('/students', data)
        .then((res) => {
            alert(res.data)
            window.location.reload()
        })
        .catch((err) => {
            alert(err)
        })
}

export function handleFileImportSingle(student: Student) {
    handleFileImport(student)
}

export function handleFileImportMultiple(students: Student[]) {
    handleFileImport(JSON.stringify(students))
}

export function fetchStudents(setMetadata: (metadata: MetadataState) => void, setStudents: (students: Student[]) => void) {
    try {
        axiosJson
            .get('/students')
            .then((res) => {
                    setMetadata({
                        programs: res.data.programs,
                        faculties: res.data.faculties,
                        status: res.data.status
                    });
                    setStudents((res.data.students as Array<Student>).sort(sortStudentCompare));
                }
            )
    } catch (e) {
        console.error(e);
        alert(e);
    }
}