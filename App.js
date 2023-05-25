import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigator';

import AppLoading from 'expo-app-loading';

import Realm from 'realm';


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

	const startLoading = async () => {
		const realm = await Realm.open({
		  	path: 'nomadDiaryDB',
		  	schema: [FeelingSchema],
		});
	};

	const onFinish = () => setReady(true);

	if (!ready) { 
		return <AppLoading 
			startAsync={startLoading} 
			onFinish={onFinish}
			onError={console.error}
		/>;
	};

	return (
		<NavigationContainer>
			<Navigator /> 
		</NavigationContainer>
	);
}