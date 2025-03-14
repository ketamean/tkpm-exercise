export default function outputMD(data: {[key: string]: any}, templateString: string) {
    let res = templateString;
    Object.entries(data).forEach(([key, value]) => {
        res = res.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    })

    return res;
}