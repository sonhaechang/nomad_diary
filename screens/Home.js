import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';

import colors from '../colors';
import { useDB } from '../context';
import { FlatList } from 'react-native';


const View = styled.View`
    flex: 1;
    padding: 0px 30px;
    padding-top: 100px;
    background-color: ${colors.bgColor};
`;

const Title = styled.Text`
    color: ${colors.textColor};
    font-size: 38px;
    margin-bottom: 100px;
    font-weight: 500;
`;

const Record = styled.View`
    background-color: ${colors.cardColor};
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    border-radius: 10px;
`;

const Emotion = styled.Text`
    font-size: 22px;
    margin-right: 10px;
`;

const Message = styled.Text`
    font-size: 16px;
`;

const Separator = styled.View`
    height: 10px;
`;

const Btn = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    right: 50px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    background-color: ${colors.btnColor};
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

export default function Home({ navigation: { navigate } }) {
    const realm = useDB();

    const [feelings, setFeelings] = useState([]);

    useEffect(() => {
        const feelings = realm.objects('Feeling');

        setFeelings(feelings);

        feelings.addListener(() => {        
            setFeelings(realm.objects('Feeling'));
        });

        return () => {
            feelings.removeAllListeners();
        };
    }, []);

	return (
		<View>
            <Title>My journal</Title>

            <FlatList 
                data={feelings} 
                ItemSeparatorComponent={Separator}
                keyExtractor={(feeling) => String(feeling._id)} 
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({item}) => (
                    <Record>
                        <Emotion>{item.emotion}</Emotion>
                        <Message>{item.message}</Message>
                    </Record>
                )}
            />

            <Btn onPress={() => navigate('Write')}>
                <Ionicons name='add' color='white' size={36} />
            </Btn>
        </View>
	);
}