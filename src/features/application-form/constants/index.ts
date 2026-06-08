import {
  BriefcaseBusiness, GraduationCap, IndianRupee, User2,
} from 'lucide-react';
import type { Step } from '../types/index.type';

export const STEPS: Step[] = [
  'Basic Details',
  'Education',
  'Experience',
  'Salary & Final',
];

export const STEP_ICONS = {
  'Basic Details': User2,
  Education: GraduationCap,
  Experience: BriefcaseBusiness,
  'Salary & Final': IndianRupee,
};