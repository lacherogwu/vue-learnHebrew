import _ from 'lodash';
import app from '../firebase/init.js';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, setDoc, query, where } from 'firebase/firestore/lite';

const db = getFirestore(app);

const getCollection = collectionName => collection(db, collectionName);

const getWords = async (options = { where: [] }) => {
	const whereQuery = _.map(options.where, item => where(item.field, item.operator, item.value));
	const collection = getCollection('words');
	const q = query(collection, ...whereQuery);

	const snapshot = await getDocs(q);

	const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	return items;
};

const createWord = async ({ hebrewTranslation, russianTranslation, topic }) => {
	const collection = getCollection('words');
	await addDoc(collection, {
		hebrewTranslation,
		russianTranslation,
		show: true,
		topic,
	});
};

const removeWord = async ({ id }) => {
	const ref = doc(db, 'words', id);
	await deleteDoc(ref);
};

const getWord = async id => {
	const ref = doc(db, 'words', id);
	const snapshot = await getDoc(ref);
	if (!snapshot.exists()) return;

	return { id: snapshot.id, ...snapshot.data() };
};

const updateWord = async (id, { hebrewTranslation, russianTranslation, show }) => {
	const ref = doc(db, 'words', id);
	await setDoc(ref, {
		hebrewTranslation,
		russianTranslation,
		show,
	});
};

export { getWords, createWord, removeWord, getWord, updateWord };
