import React, { useState, useEffect } from 'react';
import { Button, AppBar, Toolbar, TextField, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@mui/material/styles';
import { getGosha, getNikita } from '../firabaseApi'
import { BasicTable } from './Table'
import { Loader } from './Loader'
import { addData } from '../firabaseApi'

export const theme = createTheme({
	palette: {
		color: 'white',
	},
})
// const WhiteInput = styled(TextField) (({theme}) => ({
// 	color: theme.palette.color,
// }))

export const TableContainer = ({user}) => {
	const [num, setNum] = useState(null)
	const [description, setDescription] = useState('')
	const [gosha, setGosha] = useState([])
	const [nikita, setNikita] = useState([])
	const [isLoad, setIsload] = useState(false)

	useEffect(() => {
		getGosha(setGosha, setIsload)
		getNikita(setNikita, setIsload)
	}, [])
	
	const onSubmit = () => {
		addData({
			description,
			sum: num,
			date: new Date()
		}, user === 'Г. Ка.' ? setGosha : setNikita, setIsload, user === 'Г. Ка.' ? 'gosha' : 'nikita')
		setNum(null)
		setDescription('')
	}

	const calculateTotal = (data) => data.reduce((acc, item) => {
		acc += parseInt(item.sum);
		return acc
	}, 0)


	return (
		<>
			{isLoad ? <Loader /> : (
				<>
					<Container>
						<AppBar position='static'>
							<Toolbar>
								<TextField
									autoComplete='false'
									inputProps={{ style: { color: "white" } }}
									sx={{
										"& .MuiInputLabel-root": { color: "orange" },
										border: "1px solid white",
										borderRadius: 1,
										marginRight: 2,
										padding: '0 5px'
									}}
									InputProps={{ disableUnderline: true }}
									label="Описание"
									variant="standard"
									fullWidth
									onChange={e => setDescription(e.target.value)}
									value={description}
								/>
								<TextField
									inputProps={{ style: { color: "white" } }}
									sx={{
										"& .MuiInputLabel-root": { color: "orange" },
										border: "1px solid white",
										borderRadius: 1,
										marginRight: 2,
										padding: '0 5px'
									}}
									InputProps={{
										disableUnderline: true,
										type: 'number',
									}}
									label="Сумма"
									variant="standard"
									onChange={e => setNum(e.target.value)}
									value={num ? Number(num) : ''}
								/>
								<Button
									color='inherit'
									variant="text"
									size='medium'
									onClick={onSubmit}
								> Добавить <AddIcon /></Button>
							</Toolbar>
						</AppBar>
					</Container>

					<Container>
						<Typography variant="h6">Расходы БМВ Гоша</Typography>
						<BasicTable user={user} data={gosha} setState={setGosha} setIsload={setIsload} />
						<br />
						Итого Гоша: {!!gosha.length && <strong>{calculateTotal(gosha)}</strong>}
					</Container>
					<br />
					<Container>
						<Typography variant="h6">Расходы БМВ Никита</Typography>
						<BasicTable user={user} data={nikita} setState={setNikita} setIsload={setIsload} />
						<br />
						Итого Никита: {!!gosha.length && <strong>{calculateTotal(nikita)}</strong>}
					</Container>
				</>
			)}
		</>
	);
};




