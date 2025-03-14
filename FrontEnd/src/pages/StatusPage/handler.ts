import { axiosJson } from "../../config/axios";
import { Status } from "../../models/Status";

export function handleAddStatusSubmit(data: FormData, setModalState: (state: boolean) => void) {
    axiosJson
        .post('/status', data)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function handleUpdateStatusSubmit(query: {[key: string]: any}, data: string, setModalState: (state: boolean) => void) {
    axiosJson
        .put(`/status?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}&name=${data}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err.message)
            setModalState(false)
        })
}

export function handleDeleteStatusSubmit(query: {[key: string]: any}, setModalState: (state: boolean) => void) {
    axiosJson
        .delete(`/status?${Object.entries(query).map(([key, val]: [string, any]) => `${key}=${val}`).join('&')}`)
        .then(() => window.location.reload())
        .catch((err) => {
            alert(err)
            setModalState(false); // close modal
        })
}

export function fetchStatus(setStatus: (status: Status[]) => void) {
    try {
        axiosJson
            .get('/status')
            .then((res) => {
                setStatus(res.data.status);
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