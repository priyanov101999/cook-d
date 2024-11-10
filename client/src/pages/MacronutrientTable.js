import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const MacronutrientTable = ({macronutrients}) => {


  return (
    <div>

      {macronutrients && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Macronutrient</strong></TableCell>
                <TableCell align="right"><strong>Value</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Total Calories</TableCell>
                <TableCell align="right">{macronutrients.total_calories}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Protein</TableCell>
                <TableCell align="right">{macronutrients.total_protein}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Fat</TableCell>
                <TableCell align="right">{macronutrients.total_fat}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Carbs</TableCell>
                <TableCell align="right">{macronutrients.total_carbs}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MacronutrientTable;
