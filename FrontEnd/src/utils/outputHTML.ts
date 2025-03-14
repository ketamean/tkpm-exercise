import outputMD from "./outputMD";
import { marked } from "marked";
export default async function outputHTML(data: {[key: string]: any}, templateString: string) {
    let res = outputMD(data, templateString); // get MD format
    return await marked(res);
}