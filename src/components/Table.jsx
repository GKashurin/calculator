import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { onDelete, onUpdate, onDeleteNikita, onUpdateNikita } from '../firabaseApi'

function createData(
  desc,
  sum,
  date,
  id,
) {
  return { desc, sum, date, id };
}

export const BasicTable = ({ data, setState, setIsload, user }) => {
  const [updatedId, setUpdatedId] = useState(0)
  const [rows, setRows] = useState([])
  const [description, setDescription] = useState('')
  const [sum, setSum] = useState('')

  useEffect(() => {
    !!data.length && setRows(data.map(item => {
      return createData(
        item.description,
        item.sum,
        item.date,
        item.id
      )
    }))
  }, [data, updatedId])

  const getDate = ms => format(new Date(ms.seconds * 1000), 'dd/MM/yyyy')

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
            <TableCell>Описание</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.desc}
              sx={{ '&:last-child td, &:last-child th': {  } }}
            >
              <TableCell sx={{ padding: '2px 15px' }} component="th" scope="row">{updatedId == row.id? <TextField
          sx={{ '& .MuiInputBase-input': { padding: '7px' } }}
          fullWidth
          onChange={e => setDescription(e.target.value)}
          value={description}
        /> : row.desc}</TableCell>
              <TableCell sx={{ padding: '2px 15px' }} align="right">{updatedId == row.id ? <TextField
          value={sum}
          sx={{ '& .MuiInputBase-input': { padding: '7px' } }}
          fullWidth
          InputProps={{ type: 'number' }}
          onChange={e => setSum(e.target.value)}
        /> : row.sum}</TableCell>
              <TableCell sx={{ padding: '2px 15px' }} align="right">{getDate(row.date)}</TableCell>
              <TableCell sx={{ padding: '2px 15px' }} align="right">
                {updatedId == row.id ?
          <>
            <Box sx={{
              display: 'inline-block',
              cursor: 'pointer',
              padding: '5px 15px',
              '&:hover': {
                background: "#ccc",
              },
            }}>
              <Button
                color='inherit'
                variant="outlined"
                size='small'
                onClick={() => setUpdatedId(0)}
              >
                Отменить
              </Button>
            </Box>
            <Box sx={{
              display: 'inline-block',
              cursor: 'pointer',
              padding: '5px 15px',
              '&:hover': {
                background: "#ccc",
              },
            }}>
              <Button
                color='inherit'
                variant="outlined"
                size='small'
                onClick={() => {
                  user === 'Г. Ка.' ?
                  onUpdate(row.id, setState, setIsload, {
                    description,
                    sum,
                    date: row.date
                  }) : onUpdateNikita(row.id, setState, setIsload, {
                    description,
                    sum,
                    date: row.date
                  })
                  setUpdatedId(0)
                }}
              >
                Сохранить <SendIcon />
              </Button>
            </Box>
  
          </>
          : <>
            <Box sx={{
              display: 'inline-block',
              cursor: 'pointer',
              padding: '5px 15px',
              '&:hover': {
                background: "#ccc",
              },
            }}>
              <EditIcon fontSize='medium' onClick={() => {
                setUpdatedId(row.id)
                setDescription(row.desc);
                setSum(row.sum)
                }} />
            </Box>
            <Box sx={{      
              display: 'inline-block',
              cursor: 'pointer',
              padding: '5px 15px',
              '&:hover': {
                background: "#ccc",
              },
            }}>
              <DeleteIcon fontSize='medium' onClick={() => {
                user === 'Г. Ка.' ? 
                onDelete(row.id, setState, setIsload) 
                : onDeleteNikita(row.id, setState, setIsload)
                setUpdatedId(0)
              }} />
            </Box>
          </>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
