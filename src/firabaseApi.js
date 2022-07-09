import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

const makeid = (length) =>  {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for ( let i = 0; i < length; i++ ) {
	  result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export const getGosha = (getData, getLoad) => {
	getLoad(true);
	return getDocs(collection(db, 'gosha'))
		.then(res => {
			getData(res.docs.map(el => ({ ...el.data(), id: el.id })))
			getLoad(false)
		});
}

export const onDelete = (id, func1, func2) => {
	deleteDoc(doc(db, 'gosha', id));
	getGosha(func1, func2)
}

export const onUpdate = (id, func1, func2, obj) => {
	console.log(obj)
	updateDoc((doc(db, 'gosha', id)), obj);
	getGosha(func1, func2)
}

export const addData = (data, func1, func2, collection) => {
	setDoc(doc(db, collection, makeid(15)), data);
	collection === 'gosha' ? getGosha(func1, func2) : getNikita(func1, func2)
}

export const getNikita = (getData, getLoad) => {
	getLoad(true);
	return getDocs(collection(db, 'nikita'))
		.then(res => {
			getData(res.docs.map(el => ({ ...el.data(), id: el.id })))
			getLoad(false)
		});
}

export const onDeleteNikita = (id, func1, func2) => {
	deleteDoc(doc(db, 'nikita', id));
	getNikita(func1, func2)
}

export const onUpdateNikita = (id, func1, func2, obj) => {
	console.log(obj)
	updateDoc((doc(db, 'nikita', id)), obj);
	getNikita(func1, func2)
}

export const addDataNikita = (data, func1, func2) => {
	setDoc(doc(db, "nikita", makeid(15)), data);
	getNikita(func1, func2)
}