import { ReactElement, useState, useEffect, FormEvent } from "react";
import axios from "axios";
import Modal from 'react-modal'
// import {AdminConfig} from '../../models/AdminConfig'

interface ConfigProps {
    phonenumberPattern: RegExp;
    emailPatterns: RegExp[];
    deleteStudentSeconds: number;
    applyFlag: boolean;
    studentStatusPrecedences: {[id: number]: string};
}

interface AddEmailPatternModalProps {
    state: boolean;
    setState: (value: boolean) => void;
    phonenumberPattern: RegExp;
    emailPatterns: RegExp[];
    deleteStudentSeconds: number;
    applyFlag: boolean;
    studentStatusPrecedences: {[id: number]: string};
}

function AddEmailPatternModal(props: AddEmailPatternModalProps): ReactElement {
    return (
        <Modal
            isOpen={props.state}
            onRequestClose={() => props.setState(false)}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    width: '30%',
                    height: '30%',
                    margin: 'auto',
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    color: 'black'
                }
            }}
        >
            <form className="flex flex-col gap-y-4 w-full justify-center"
                onSubmit={(e: FormEvent) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement
                    try {
                        new RegExp(form.emailPattern.value);
                        axios
                            .put('http://localhost:3000/adminConfig', {applyFlag: props.applyFlag, phonenumberPattern: props.phonenumberPattern, emailPatterns: [...props.emailPatterns, form.emailPattern.value.trim()], deleteStudentSeconds: props.deleteStudentSeconds, studentStatusPrecedences: props.studentStatusPrecedences})
                            .then(() => window.location.reload())
                            .catch((err) => {
                                console.error(err);
                                alert(err)
                                props.setState(false)
                            })
                    } catch (err) {
                        alert(err);
                        props.setState(false)
                        return;
                    }
                }}
            >
                <label className="w-1/5 min-w-48 max-w-60 h-8 font-semibold">Email patterns</label>
                <input className="h-8 w-full rounded-2xl border-1 border-black px-4" type="text" name="emailPattern"/>
                <button
                    type="submit"
                    className="w-20 h-12 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                >
                    Add
                </button>                          
            </form>
        </Modal>
    )
}

function Config(props: ConfigProps): ReactElement {
    let {phonenumberPattern, emailPatterns, deleteStudentSeconds, applyFlag, studentStatusPrecedences} = props;
    const [addEmailPatternModal, setAddEmailPatternModal] = useState<boolean>(false);
    return (
        <>
            <div className='flex flex-row gap-x-4 w-full h-8 items-center'>
                <label className="w-1/5 min-w-48 max-w-60 font-semibold">Phone number pattern</label>
                <input className="h-full w-full rounded-2xl border-1 border-black px-4" type="text" name="phonenumberPattern" value={phonenumberPattern? phonenumberPattern.toString() : ''}/>
            </div>
            <div className='flex flex-col gap-y-4 w-full justify-center'>
                <label className="w-1/5 min-w-48 max-w-60 h-8 font-semibold">Email patterns</label>
                <table className="w-full h-full pl-8">
                    <tbody>
                        {
                            emailPatterns.map((pattern, index) => (
                                <tr className="w-full h-8 gap-x-6 border-b-1 border-gray-300">
                                    <td><span className="mr-2">{index + 1}</span></td>
                                    <td>{pattern.toString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button
                    type="button"
                    className="w-20 h-12 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                    onClick={() => setAddEmailPatternModal(true)}
                >
                    Add
                </button>                          
            </div>
            <AddEmailPatternModal state={addEmailPatternModal} setState={setAddEmailPatternModal} phonenumberPattern={phonenumberPattern} emailPatterns={emailPatterns} deleteStudentSeconds={deleteStudentSeconds} applyFlag={applyFlag} studentStatusPrecedences={studentStatusPrecedences}/>
        </>
    )
}

export default function Admin(): ReactElement {
    // const [config, setConfig] = useState<AdminConfig | null>(null);
    let [phonenumberPattern, setPhonenumberPattern] = useState<RegExp>(/^/);
    let [emailPatterns, setEmailPatterns] = useState<RegExp[]>([]);
    let [deleteStudentSeconds, setDeleteStudentSeconds] = useState<number>(0);
    let [applyFlag, setApplyFlag] = useState<boolean>(false);
    let [studentStatusPrecedences, setStudentStatusPrecedences] = useState<{[id: number]: string}>({});
    useEffect(() => {
        axios
            .get('http://localhost:3000/adminConfig')
            .then((res) => {
                console.log(res.data)
                setPhonenumberPattern(res.data.phonenumberPattern);
                setEmailPatterns(res.data.emailPatterns);
                setDeleteStudentSeconds(res.data.deleteStudentSeconds);
                setApplyFlag(res.data.applyFlag);
                setStudentStatusPrecedences(res.data.studentStatusPrecedences);
            })
            .catch((err) => {
                console.error(err);
                alert(err)
            });
    }, [])
    return (
        <div className='p-4 bg-white rounded-b-lg flex flex-col gap-4 h-full w-full'>
            <form onSubmit={(e: FormEvent) => {
                e.preventDefault();
                axios
                    .put('http://localhost:3000/adminConfig', {applyFlag, phonenumberPattern, emailPatterns, deleteStudentSeconds, studentStatusPrecedences})
                    .then(() => {
                        window.location.reload();
                    })
                    .catch((err) => {                 
                        console.error(err);
                        alert(err)
                    })
            }}>
                <div className="flex flex-row gap-x-2 h-5 items-center w-full">
                    <input name="applyFlag" type="checkbox" className="h-full aspect-square" checked={applyFlag}
                        onChange={(e) => setApplyFlag(e.target.checked as boolean)}
                    />
                    <label htmlFor="applyFlag">Apply Config</label>
                </div>
                {
                    applyFlag?
                        <Config phonenumberPattern={phonenumberPattern} emailPatterns={emailPatterns} deleteStudentSeconds={deleteStudentSeconds} applyFlag={applyFlag} studentStatusPrecedences={studentStatusPrecedences}/>:
                        <></>
                }
            </form>
        </div>
    )
}