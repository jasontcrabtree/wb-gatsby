import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    //   Wes sometimes likes to check if its a number, if you're expecting a number and its a string convert
    //   destructured value = e.target.value
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    setValues({
      // copy the existing values into the setValues object
      //   ...values gets everything that is currently in state
      ...values,
      // then update the new value that changed
      [e.target.name]: value,
      /* (we set the form input NAME element to the input value. this lets us update the values without hardcoding the actual input) */
    });
  }

  // return the spread in values and the updateValue object
  return { values, updateValue };
}
