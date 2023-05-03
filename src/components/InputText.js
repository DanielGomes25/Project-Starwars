import { useContext } from 'react';
import MyContext from '../contexts/MyContext';

function InputText() {
  const { setinputName, inputName } = useContext(MyContext);
  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ inputName }
      onChange={ ({ target }) => setinputName(target.value) }

    />
  );
}

export default InputText;
