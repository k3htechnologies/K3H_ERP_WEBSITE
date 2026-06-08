import type { Opening } from '../types/career.type';
import { OPENINGS } from '../constants/career.constant';

export async function fetchJobOpenings(
  signal?: AbortSignal
): Promise<Opening[]> {
  // let response = await httpClient<Opening[]>({
  //     endpoint : CarrerApi.GET_JOB_OPENINGS,
  //     method : 'GET',
  //     signal : signal
  // })
  // dummy response
  let response = OPENINGS;
  return response;
}
