import {Student} from '../models/Student'
import Papa, { ParseResult } from 'papaparse'

export async function processStudentCSV(file: File): Promise<Student[]> {
  return new Promise<Student[]>((resolve, reject) => {
    Papa.parse(file, {
        header: true,
        delimiter: ',',
        skipEmptyLines: true,
        complete: (results: ParseResult<Student>) => {
          resolve(results.data as Student[])
        },
        error: (error) => {
          console.log(`file ${file} cannot be read`)
          reject(error)
        },
      }
    )
  })
}