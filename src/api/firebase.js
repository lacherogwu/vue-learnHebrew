import _ from 'lodash';
import app from '../firebase/init.js';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, query, where, setDoc } from 'firebase/firestore/lite';
import store from '../store';

const db = getFirestore(app);

const getCollection = collectionName => collection(db, collectionName);

const getWords = async (options = { where: [] }) => {
	const { loggedInUser: username } = store.state;
	if (!username) return;

	const whereQuery = _.map(options.where, item => where(item.field, item.operator, item.value));
	const collection = getCollection('words');
	const q = query(collection, ...whereQuery, where('username', '==', _.toLower(username)));

	const snapshot = await getDocs(q);

	const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	return items;
};

const createWord = async ({ word, translation, topic }) => {
	const { loggedInUser: username } = store.state;
	if (!username) return;

	const collection = getCollection('words');
	await addDoc(collection, {
		word,
		translation,
		show: true,
		topic: _.toLower(topic),
		username,
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

const updateWord = async (id, { word, translation, topic, show }) => {
	const ref = doc(db, 'words', id);
	await updateDoc(ref, {
		word,
		translation,
		topic,
		show,
	});
};

const getTopics = async () => {
	const words = await getWords();
	const topics = _(words)
		.uniqBy('topic')
		.map(item => item.topic)
		.value();

	return topics;
};

const unShowCard = async id => {
	const ref = doc(db, 'words', id);
	await updateDoc(ref, {
		show: false,
	});
};

const signup = async (username, password) => {
	username = _.toLower(username);
	const collection = getCollection('users');
	const q = query(collection, where('username', '==', username));
	const snapshot = await getDocs(q);

	if (!snapshot.empty) throw new Error('User already exists');

	await addDoc(collection, {
		username,
		password,
	});
};

const login = async (username, password) => {
	username = _.toLower(username);
	const collection = getCollection('users');
	const q = query(collection, where('username', '==', username), where('password', '==', password));
	const snapshot = await getDocs(q);

	if (snapshot.empty) throw new Error('Username or password is invalid');
};

export { getWords, createWord, removeWord, getWord, updateWord, getTopics, unShowCard, signup, login };
