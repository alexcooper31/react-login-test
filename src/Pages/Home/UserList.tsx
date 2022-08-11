import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { IUser } from '../../types';

interface IUserList {
  userArray: IUser[];
  handleChangePage: (event: unknown, newPage: number) => void;
  page: number;
}

const UserList = ({ userArray, handleChangePage, page }: IUserList) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 300 }}>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell align="right">Password</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userArray.slice(page * 10, page * 10 + 10).map((row: IUser, index: number) => (
          <TableRow key={index}>
            <TableCell>{row.email}</TableCell>
            <TableCell align="right">{row.password}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TablePagination
      component="div"
      rowsPerPageOptions={[10]}
      count={userArray.length}
      rowsPerPage={10}
      page={page}
      onPageChange={handleChangePage}
    />
  </TableContainer>
);

export default UserList;
