import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Typography, Card, TextField } from '@mui/material';
import TableData from './TableData';
import axios from 'axios';
import DropdownCountry from './DropdownCountry';
import DropdownState from './DropdownState';
import DropdownCity from './DropdownCity';


const Form = ({ countries, setCountries }) => {
    const [email, setEmail] = useState('');

    const [countryStates, setCountryStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [countryChosen, setCountryChosen] = useState('');
    const [stateChosen, setStateChosen] = useState('');
    const [cityChosen, setCityChosen] = useState('');

    const [countryArr, setCountryArr] = useState([]);
    const [stateArr, setStateArr] = useState([]);
    const [cityArr, setCityArr] = useState([]);

    const [savedCountries, setSavedCountries] = useState([]);
    const [savedStates, setSavedStates] = useState([]);
    const [savedCities, setSavedCities] = useState([]);
    const [savedEmail, setSavedEmail] = useState('');

    const [isSubmit, setIsSubmit] = useState(false);
    
    const countryName = countries?.map(country => country.name);


    // const saveCountry = () => {
    //   setCountryArr([...countryArr, countryChosen]);
    //   localStorage.setItem('Countries', JSON.stringify(countryArr));
    //   setSavedCountries(JSON.parse(localStorage.getItem('Countries')));
    // };

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }   

    // const handleSave = (e) => {
    //   // e.preventDefault();
    //   localStorage.setItem('Countries', JSON.stringify(countryArr));
    //   setSavedCountries(JSON.parse(localStorage.getItem('Countries')));
  
    //   localStorage.setItem('States', JSON.stringify(stateArr));
    //   let savedStates = JSON.parse(localStorage.getItem('States'));
  
    //   localStorage.setItem('Cities', JSON.stringify(cityArr));
    //   let savedCities = JSON.parse(localStorage.getItem('Cities'));

    //   localStorage.setItem('submit', isSubmit);
    //   let savedSubmit = localStorage.getItem('submit');
    // }

    function handleSubmit (e) {
      e.preventDefault();
      setCountryArr([...countryArr, countryChosen]);
      setStateArr([...stateArr, stateChosen]);
      setCityArr([...cityArr, cityChosen]);
      setIsSubmit(!isSubmit);

      // handleSave();
      // handleSave();
    }

    useEffect(() => {
      localStorage.setItem('Countries', JSON.stringify(countryArr));
      setSavedCountries(JSON.parse(localStorage.getItem('Countries')));
  
      localStorage.setItem('States', JSON.stringify(stateArr));
      setSavedStates(JSON.parse(localStorage.getItem('States')));
  
      localStorage.setItem('Cities', JSON.stringify(cityArr));
      setSavedCities(JSON.parse(localStorage.getItem('Cities')));

      localStorage.setItem('Email', JSON.stringify(email));
      setSavedEmail(JSON.parse(localStorage.getItem('Email')));

      localStorage.setItem('submit', isSubmit);
      let savedSubmit = localStorage.getItem('submit');
    }, [isSubmit])
    console.log(savedCountries);
   
    useEffect(() => {
      axios.post('https://countriesnow.space/api/v0.1/countries/states', {
        "country": `${countryChosen}`
      })
      .then((res) => {
        setCountryStates(res.data.data.states);
      })
      .catch((err) => console.log(err))
    }, [countryChosen]);

    useEffect(() => {
      axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        "country": `${countryChosen}`,
        "state": `${stateChosen}`
      })
        .then((res) => {
          setCities(res.data.data);
        })
        .catch((err) => console.log(err))
    }, [stateChosen, countryChosen]);
   

    if (countryName && countryStates) {
      return (
          <div>
              <Card className='form-container'>
                  <Typography variant='h6' component='h6' sx={{fontWeight: 'bold', padding: '1em 0'}}>Let's know you more</Typography>
                  <span className='subtext'>Fill the appropriate details</span>
                  <form action="" onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" className='email' value={email} onChange={handleEmailChange}/>
                    <DropdownCountry countryName={countryName} countryChosen={countryChosen} setCountryChosen={setCountryChosen}/>
                    <DropdownState countryStates={countryStates} stateChosen={stateChosen} setStateChosen={setStateChosen}/>
                    <DropdownCity cities={cities} cityChosen={cityChosen} setCityChosen={setCityChosen}/>
                    <button type="submit">Submit</button>
                  </form>   
              </Card>
              <TableData savedEmail={savedEmail} savedCountries={savedCountries} savedStates={savedStates} savedCities={savedCities}/>
          </div>
      )
    }

  
}

export default Form