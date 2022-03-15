import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card } from '@mui/material';

const TableData = ({ savedCountries, savedStates, savedCities, savedEmail }) => {
  // const [combined1, setCombined1] = useState([]);
  // const [combined2, setCombined2] = useState([]);
  // const [combined3, setCombined3] = useState([]);



  let combined1 = savedStates.map((el, i) => {
    return {'state': el, 'city': savedCities[i]}
  });
  let combined2 = savedCountries.map((el, i) => {
    return {'country': el, 'email': savedEmail}
  });
  let combined3 =  Object.assign({}, ...[...combined1 ,...combined2]);


  console.log(combined1, combined2, combined3);

  
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Country</TableCell>
              <TableCell align='center'>State</TableCell>
              <TableCell align='center'>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
  
}

export default TableData