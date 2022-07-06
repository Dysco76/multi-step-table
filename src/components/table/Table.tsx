import classes from './styles.module.scss';
import { TableRow } from './TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { Person } from '../../model/Person';
import { peopleActions } from '../../store';
import { TableFields as headers } from '../../config/TableFields';

export function Table(): JSX.Element {
  const hiddenFields: string[] = [];
  const people = useSelector((state: any) => state.people);
  const dispatch = useDispatch();

  function handleRemove(person: Person) {
    dispatch(peopleActions.removePerson(person));
  }

  function renderHeaders() {
    return headers.map((header) => {
      if (header.hidden) {
        hiddenFields.push(header.name.toLowerCase());
        return null;
      }
      return (
        <th className={classes[`cell-${header.width}`]} key={header.name}>
          {header.name}
        </th>
      );
    });
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th></th>
          {renderHeaders()}
        </tr>
      </thead>
      <tbody>
        {people.map((person: Person) => (
          <TableRow
            onRemove={handleRemove}
            key={person.id}
            person={person}
            hiddenFields={hiddenFields}
          />
        ))}
      </tbody>
    </table>
  );
}
