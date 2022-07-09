import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Stack } from '@mui/material';
import { TableContainer } from './components/TableContainer'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase";

const signIn = () => {
	signInWithPopup(auth, provider)
		.then(result => console.log(result))
		.catch(error => alert(error.message))
}

const App = () => {
	const [authUserName] = useAuthState(auth)
	return (
		<div className="App">
			{!authUserName
				? <Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Button
						size='small'
						variant="contained"
						onClick={signIn}
					>
						Войти с помощью Google
					</Button>
				</Stack>
				: <TableContainer user={authUserName.displayName} />}
		</div>

	);
};

export default App;