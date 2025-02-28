import fs from 'fs'

const defaultConfigs: {[key: string]: any} = {
	phonenumberPattern: /^(?:\+84|0[2389])\d+$/,
	emailPatterns: [(/.+@student\.hcmus\.edu\.vn$/), (/.+@clc\.fitus\.edu\.vn$/), (/.+@apcs\.fitus\.edu\.vn$/), (/.+@vp\.fitus\.edu\.vn$/)],
	deleteStudentSeconds: "1800",
	applyFlag: true,
	studentStatusPrecedences: null
}
export const configLabels = ['phonenumberPattern', 'emailPatterns', 'deleteStudentSeconds', 'applyFlag', 'studentStatusPrecedences']

const filepath = './config/adminConfig/config.json'

async function parseJson(filePath: string) {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        return jsonData;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

export async function getAdminConfig() {
	try {
		const configs: {[key: string]: any} = {}
		const data = await parseJson(filepath)
		const _data: {[key: string]: any} = data as {[key: string]: any}
		configLabels.forEach((label) => {
			switch (label) {
				case 'phonenumberPattern':
					configs[label] = _data[label]? new RegExp(_data[label]) : new RegExp(defaultConfigs[label])
					break
				case 'emailPatterns':
					configs[label] = _data[label]? _data[label].map((pattern: string) => new RegExp(pattern)) : defaultConfigs[label].map((pattern: string) => new RegExp(pattern))
					break
				default:
					configs[label] = _data[label]? _data[label] : defaultConfigs[label]
					break
			}
		});
		return configs
	} catch (e) {
		console.log(e)
		return defaultConfigs
	}
}

export function setAdminConfig(data: any) {
	try {
		const _data: {[key: string]: any} = {}
		configLabels.forEach((label) => {
			switch (label) {
				case 'phonenumberPattern':
					_data[label] = data[label].toString()
					break
				case 'emailPatterns':
					_data[label] = data[label].map((pattern: RegExp) => pattern.toString())
					break
				default:
					_data[label] = data[label]
					break
			}
		})
		const jsonData = JSON.stringify(_data, null, 2); // Convert data to JSON string
		fs.writeFileSync(filepath, jsonData);
		return _data
	} catch (e) {
		console.log(e)
		return defaultConfigs
	}
}