import type { Opening } from "../types/index.type";
import { OPENINGS } from "../constants";

export async function fetchJobOpenings(signal?: AbortSignal) : Promise<Opening[]> {
    // let response = await httpClient<Opening[]>({
    //     endpoint : CarrerApi.GET_JOB_OPENINGS,
    //     method : 'GET',
    //     signal : signal
    // })
    // dummy response
    let response = OPENINGS;
    return response;
}