import { Loader } from './Loader';
import { usePeople } from '../context/PeopleContext';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

export const People = () => {
  const { people, isLoading, errorMessage } = usePeople();
  const { slugs } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!errorMessage && people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!errorMessage && people.length > 0 && !isLoading && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map((person, index) => {
                  const { sex, born, died, fatherName, motherName, slug } =
                    person;
                  const mother = people.find(p => p.name === motherName);
                  const father = people.find(p => p.name === fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={index}
                      className={classNames({
                        'has-background-warning':
                          slugs?.includes(slug) && slugs,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      {!motherName ? (
                        <td>-</td>
                      ) : (
                        <td>
                          {mother ? <PersonLink person={mother} /> : motherName}
                        </td>
                      )}
                      {!fatherName ? (
                        <td>-</td>
                      ) : (
                        <td>
                          {father ? <PersonLink person={father} /> : fatherName}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
