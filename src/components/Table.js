import { useContext } from 'react';
import MyContext from '../contexts/MyContext';

function Table() {
  const { apiData, inputName } = useContext(MyContext);
  const names = apiData.length > 0 ? Object.keys(apiData[0]) : [];

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              names.map((name) => (
                <th key={ name }>{name}</th>
              ))
            }
          </tr>

        </thead>
        <tbody>
          {
            apiData.filter((input) => input.name.includes(inputName)).map((data) => (
              <tr key={ data.name }>
                <td>{data.name}</td>
                <td>{data.rotation_period}</td>
                <td>{data.orbital_period}</td>
                <td>{data.diameter}</td>
                <td>{data.climate}</td>
                <td>{data.gravity}</td>
                <td>{data.terrain}</td>
                <td>{data.surface_water}</td>
                <td>{data.population}</td>
                <td>{data.films}</td>
                <td>{data.created}</td>
                <td>{data.edited}</td>
                <td>{data.url}</td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
