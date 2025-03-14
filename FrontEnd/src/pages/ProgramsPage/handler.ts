import { axiosJson } from "../../config/axios";
import { Program } from "../../models/Program";
import { Faculty } from "../../models/Faculty";

export function handleAddProgramSubmit(data: FormData, setModalState: (state: boolean) => void) {
    axiosJson
        .post('/programs', data)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function handleUpdateProgramSubmit(query: {[key: string]: any}, data: string, setModalState: (state: boolean) => void) {
    axiosJson
        .put(`/programs?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}&name=${data}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err.message)
            setModalState(false)
        })
}

export function handleDeleteProgramSubmit(query: {[key: string]: any}, setModalState: (state: boolean) => void) {
    axiosJson
        .delete(`/programs?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function fetchPrograms(setPrograms: (programs: Program[]) => void) {
    try {
        axiosJson
            .get('/programs')
            .then((res) => {
                setPrograms(res.data.programs);
            })
            .catch((e) => {
                console.error(e);
                alert(e);
            })
    } catch (e) {
        console.error(e);
        alert(e);
    }
}

export function handleAddFacultySubmit(data: FormData, setModalState: (state: boolean) => void) {
    axiosJson
        .post('/faculties', data)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function handleUpdateFacultySubmit(query: {[key: string]: any}, data: string, setModalState: (state: boolean) => void) {
    axiosJson
        .put(`/faculties?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}&name=${data}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err.message)
            setModalState(false)
        })
}

export function handleDeleteFacultySubmit(query: {[key: string]: any}, setModalState: (state: boolean) => void) {
    axiosJson
        .delete(`/faculties?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function fetchFaculties(setFaculties: (faculties: Faculty[]) => void) {
    try {
        axiosJson
            .get('/faculties')
            .then((res) => {
                setFaculties(res.data.faculties);
            })
            .catch((e) => {
                console.error(e);
                alert(e);
            })
    } catch (e) {
        console.error(e);
        alert(e);
    }
}