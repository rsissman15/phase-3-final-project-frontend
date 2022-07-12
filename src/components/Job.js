import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});






function Job({jobs,handleDelete,handleUpdate}) {
  const classes = useStyles();
 
    const rows = jobs

    
    

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Job</TableCell>
            <TableCell align="center">Company</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Interview Round</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.position}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.company.name}
              </TableCell>
               <TableCell align="left">{row.description}</TableCell>
               <TableCell align="left">{row.interview_round}</TableCell>
               <TableCell>
                 <Button variant="contained" color="primary" onClick={()=>handleDelete(row)}>Delete</Button>
               </TableCell>
               <TableCell>
                 <Button variant="contained" color="primary" onClick={()=>handleUpdate(row)}>Update Interview Round</Button> 
               </TableCell>
             </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Job;