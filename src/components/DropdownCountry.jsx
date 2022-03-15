import React, { useEffect } from 'react';

const DropdownCountry = ({ countryName, countryChosen, setCountryChosen }) => {
    const handleChange = (e) => {
        setCountryChosen(e.target.value);
    }

  return (
    <select name="countries" id="" placeholder='Country' onChange={handleChange}>
        <option value="select" selected>Country</option>
        {countryName?.map(country => (
            <option key={country} value={country}>{country}</option>
        ))}
    </select>
  )
}

export default DropdownCountry