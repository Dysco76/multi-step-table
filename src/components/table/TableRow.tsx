import classes from './styles.module.scss'
import { Person } from '../../model/Person'
import { ReactComponent as Trash } from '../../resources/Icon.svg';
import { TableFields as fields } from '../../config/TableFields'
import { getDate } from '../../utils/getDate';

type tableRowProps = {
    person: Person;
    hiddenFields: string[];
    onRemove: (person: Person) => void;
}

export function TableRow(props: tableRowProps): JSX.Element {
    const person = {...props.person};
    if (person.birthday) {
        person.birthday = getDate(person.birthday)
    }
    
    function displayCells() {
        return fields.map((field, i) => {
            if (field.hidden) {
                return null
            }

            return <td key={i}>{person[field.id as keyof Person]}</td>
        })
    }
    
    return (
    <tr>
        <td>
            <button onClick={() => props.onRemove(props.person)} className={classes.deleteBtn}>
                <Trash />
            </button>
        </td>
        {displayCells()}
    </tr>
    )
}