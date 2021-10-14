import app from '../firebase/init.js';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const db = getFirestore(app);

const getCollection = collectionName => collection(db, collectionName);

const getWords = async () => {
	const collection = getCollection('words');
	const snapshot = await getDocs(collection);

	const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	return items;
};

const createWord = async ({ hebrewTranslation, russianTranslation }) => {
	const collection = getCollection('words');
	await addDoc(collection, {
		hebrewTranslation,
		russianTranslation,
		show: true,
	});
};

const removeWord = async ({ id }) => {
	const ref = doc(db, 'words', id);
	await deleteDoc(ref);
};

export { getWords, createWord, removeWord };
