import { Diagnose } from '../types';
import diagnoses from '../../data/diagnoses';

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};