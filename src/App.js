import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import axios from 'axios';


function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => console.log(err))
  }, []);
  

  if (countries) {
    return (
      <div className='free'>
        <Form countries={countries} setCountries={setCountries}/>
      </div>
    );
  }
  
}

export default App;
