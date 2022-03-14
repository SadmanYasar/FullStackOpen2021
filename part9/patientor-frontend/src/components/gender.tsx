import React from 'react';
import { assertNever } from "../helpers";
import { Gender } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

interface GenderProps {
    gender: Gender
}

const GenderComponent = (props: GenderProps) => {
    if (!props.gender) {
        return null;
    }
    switch (props.gender) {
        case Gender.Male:
            return <MaleIcon />;

        case Gender.Female:
            return <FemaleIcon />;
        
        case Gender.Other:
            return <TransgenderIcon />;
    
        default:
            return assertNever(props.gender);
    }
};

export default GenderComponent;