import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import styled from 'styled-components/native';

import colors from '../colors';
import { useDB } from '../context';


const View = styled.View`
    flex: 1;
    background-color: ${colors.bgColor};
    padding: 0px 30px;
`;

const Title = styled.Text`
    color: ${colors.textColor};
    margin: 50px 0px;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
`;

const Emotions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity`
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
    border-width: 1px;
    border-color: ${(props) => 
        props.selected ? 'rgba(41, 30, 95, 1);' : 'transparent'};
`;

const EmotionText = styled.Text`
    font-size: 24px;
`;

const TextInput = styled.TextInput`
    background-color: white;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 18px;
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Btn = styled.TouchableOpacity`
    width: 100%;
    margin-top: 20px;
    background-color: ${colors.btnColor};
    padding: 10px 20px;
    align-items: center;
    border-radius: 20px;
    box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const BtnText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
`;

const emotions = ['🤯', '🥲', '🤬', '🤗', '🥰', '😊', '🤩'];

export default function Write({ navigation: { goBack } }) {
    const realm = useDB();

    const [selectEmotion, setSelectEmotion] = useState(null);
    const [feelings, setFeelings] = useState('');

    const onChangeText = (text) => setFeelings(text);

    const onEmotionPress = (face) => setSelectEmotion(face);

    const onSubmit = () => {
        if (feelings === '' || selectEmotion == null) {
            return Alert.alert('Please complete form.');
        };

        realm.write(() => {
            const feeling = realm.create('Feeling', {
                _id: Date.now(),
                emotion: selectEmotion,
                message: feelings,
            });
        });

        goBack();
    };

	return (
		<View>
            <Title>
                How do feel today?
            </Title>

            <Emotions>
                {emotions.map((emotion, key) => (
                    <Emotion 
                        key={key}
                        selected={emotion === selectEmotion}
                        onPress={() => onEmotionPress(emotion)}
                    >
                        <EmotionText>
                            {emotion}
                        </EmotionText>
                    </Emotion>
                ))}
            </Emotions>

            <TextInput
                value={feelings}
                onSubmitEditing={onSubmit}
                onChangeText={onChangeText}
                returnKeyType='done'
                placeholder='Write your feelings...'
            />

            <Btn onPress={onSubmit}>
                <BtnText>
                    Save
                </BtnText>
            </Btn>
        </View>
	);
}