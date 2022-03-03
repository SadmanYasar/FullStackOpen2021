import { PartProps } from '../types'

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ coursePart }: PartProps) => {
    switch (coursePart.type) {
        case 'normal':
            return(
                <>
                    <b>
                        {coursePart.name} {coursePart.exerciseCount}
                    </b>
                    <p>
                        {coursePart.description} 
                    </p>
                </>
            )

        case 'groupProject':
            return(
                <>
                    <b>
                        {coursePart.name} {coursePart.exerciseCount} 
                    </b>
                    <p>
                        project exercises: {coursePart.groupProjectCount}
                    </p>
                </>
            )

        case 'submission':
            return(
                <>
                    <b>
                        {coursePart.name} {coursePart.exerciseCount}
                    </b>
                    <p>
                        {coursePart.description} 
                    </p>
                    <p>
                        submit to: {coursePart.exerciseSubmissionLink}
                    </p>
                </>
            )

        case 'special':
            return(
                <>
                    <b>
                        {coursePart.name} {coursePart.exerciseCount}
                    </b>
                    <p>
                         {coursePart.description}
                    </p>
                    <p>required skills:</p>
                    <ul>
                        {coursePart.requirements.map((a, i) =>
                            <li key={i}>{a}</li>)}
                    </ul>
                </>
            )
    
        default:
            assertNever(coursePart);
    }

    return null
}

export default Part