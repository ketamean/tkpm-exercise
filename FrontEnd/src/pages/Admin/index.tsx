import { ReactElement, useState, useEffect, FormEvent } from "react";
// import Modal from 'react-modal'
import { dataOnSubmit, fetchAdminConfig, removeConfig } from './handler'
import { AdminConfig } from "../../models/AdminConfig";

interface ConfigProps extends AdminConfig {
    setPhoneNumberPattern: (PhoneNumberPattern: string) => void,
    setEmailPattern: (EmailPattern: string) => void,
    setDeleteStudentSeconds: (DeleteStudentSeconds: number) => void,
    setApplyFlag: (ApplyFlag: boolean) => void,
    setStudentStatusPrecedences: (StudentStatusPrecedences: number[]) => void
}

function Config(props: ConfigProps): ReactElement {
    // let {PhoneNumberPattern, EmailPattern, DeleteStudentSeconds, ApplyFlag, StudentStatusPrecedences} = props;
    // const [addEmailPatternModal, setAddEmailPatternModal] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-y-4 w-full justify-center items-center">
            <div className='flex flex-row gap-x-4 w-full h-12 items-center'>
                <label className="w-1/5 min-w-48 max-w-60 font-semibold">Phone number pattern</label>
                <input className="h-full w-full min-w-40 rounded-2xl border-1 border-black px-4" type="text" name="PhoneNumberPattern" defaultValue={props.PhoneNumberPattern? props.PhoneNumberPattern.toString() : ''}
                    onInput={(e) => props.setPhoneNumberPattern((e.target as HTMLInputElement).value)}
                />
                <button
                    type="button"
                    className="w-36 h-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                    onClick={(e: FormEvent) => dataOnSubmit(e, {PhoneNumberPattern: props.PhoneNumberPattern })}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="w-36 h-full bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 cursor-pointer"
                    onClick={() => removeConfig('PhoneNumberPattern')}
                >
                    Remove
                </button>
            </div>

            <div className='flex flex-row gap-x-4 w-full h-12 items-center'>
                <label className="w-1/5 min-w-48 max-w-60 font-semibold">Email pattern</label>
                <input className="h-full w-full min-w-40 rounded-2xl border-1 border-black px-4" type="text" name="EmailPattern" defaultValue={props.EmailPattern? props.EmailPattern.toString() : ''}
                    onInput={(e) => props.setEmailPattern((e.target as HTMLInputElement).value)}
                />
                <button
                    type="button"
                    className="w-36 h-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                    onClick={(e: FormEvent) => dataOnSubmit(e, {EmailPattern: props.EmailPattern })}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="w-36 h-full bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 cursor-pointer"
                    onClick={() => removeConfig('PhoneNumberPattern')}
                >
                    Remove
                </button>
            </div>

            <div className='flex flex-row gap-x-4 w-full h-12 items-center'>
                <label className="w-1/5 min-w-48 max-w-60 h-8 font-semibold">Delete student seconds</label>
                <input className="h-full w-full min-w-40 rounded-2xl border-1 border-black px-4" type="number" min={0} max={86400} title="Maximum 1 day (86.400s)" name="DeleteStudentSeconds" defaultValue={props.DeleteStudentSeconds? props.DeleteStudentSeconds : ''}
                    onInput={(e) => props.setDeleteStudentSeconds(parseInt((e.target as HTMLInputElement).value))}
                />
                <button
                    type="button"
                    className="w-36 h-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                    onClick={(e: FormEvent) => dataOnSubmit(e, {DeleteStudentSeconds: props.DeleteStudentSeconds })}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="w-36 h-full bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 cursor-pointer"
                    onClick={() => removeConfig('DeleteStudentSeconds')}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default function Admin(): ReactElement {
    let [PhoneNumberPattern, setPhonenumberPattern] = useState<string>('');
    let [EmailPattern, setEmailPattern] = useState<string>('');
    let [DeleteStudentSeconds, setDeleteStudentSeconds] = useState<number>(0);
    let [ApplyFlag, setApplyFlag] = useState<boolean>(false);
    let [StudentStatusPrecedences, setStudentStatusPrecedences] = useState<number[]>([]);
    useEffect(() => fetchAdminConfig(setPhonenumberPattern, setEmailPattern, setDeleteStudentSeconds, setApplyFlag, setStudentStatusPrecedences), []);
    return (
        <div className='p-4 bg-white rounded-b-lg flex flex-col gap-4 h-full w-full'>
            <form onSubmit={(e: FormEvent) => e.preventDefault()} className="flex flex-col gap-y-4 w-full justify-center items-center">
                <div className='flex flex-row gap-x-4 w-full h-12 items-center'>
                    <div className="flex flex-row gap-x-2 h-6 items-center w-full">
                        <input name="ApplyFlag" type="checkbox" className="h-full aspect-square" checked={ApplyFlag}
                            onChange={(e) => setApplyFlag(e.target.checked as boolean)}
                        />
                        <label htmlFor="ApplyFlag">Apply Config</label>
                    </div>
                    <button
                        type="button"
                        className="w-36 h-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                        onClick={(e: FormEvent) => dataOnSubmit(e, {ApplyFlag: ApplyFlag})}
                    >
                        Submit
                    </button>
                </div>
                <Config PhoneNumberPattern={PhoneNumberPattern} EmailPattern={EmailPattern} ApplyFlag={ApplyFlag} DeleteStudentSeconds={DeleteStudentSeconds} StudentStatusPrecedences={StudentStatusPrecedences}
                    setApplyFlag={setApplyFlag} setPhoneNumberPattern={setPhonenumberPattern} setEmailPattern={setEmailPattern} setDeleteStudentSeconds={setDeleteStudentSeconds} setStudentStatusPrecedences={setStudentStatusPrecedences}
                />
            </form>
        </div>
    )
}