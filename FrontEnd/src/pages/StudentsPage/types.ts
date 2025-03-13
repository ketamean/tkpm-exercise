import { Program } from "../../models/Program";
import { Faculty } from "../../models/Faculty";
import { Status } from "../../models/Status";
export interface MetadataState {
    programs: Program[];
    faculties: Faculty[];
    status: Status[];
}