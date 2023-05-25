import React, { useState, useCallback, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigator';

import * as SplashScreen from 'expo-splash-screen';

import Realm from 'realm';
import { DBContext } from './context';


const FeelingSchema = {
	name: 'Feeling',
	properties: {
		_id: 'int',
		emotion: 'string',
		message: 'string',
	},
	primaryKey: '_id',
};

export default function App() {
	const [ready, setReady] = useState(false);
	const [realm, setRealm] = useState(null);

	useEffect(() => {
		const prepare = async () => {
			try {
				const connection = await Realm.open({
					path: 'nomadDiaryDB',
					schema: [FeelingSchema],
				});
				setRealm(connection);
			} catch (e) {
				console.warn(e);
			} finally {
				setReady(true);
			}
		}
	
		prepare();
	}, []);

	useCallback(async () => {
		if (ready) { await SplashScreen.hideAsync(); }
	}, [ready]);

	if (!ready) { return null; };

	return (
		<DBContext.Provider value={realm}>
			<NavigationContainer>
				<Navigator /> 
			</NavigationContainer>
		</DBContext.Provider>
	);
}