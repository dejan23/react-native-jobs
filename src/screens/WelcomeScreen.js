import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import _ from 'lodash'

import { AppLoading } from 'expo'
import Slides from '../components/Slides'

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4' },
    { text: 'Use this to get a job', color: '#009688' },
    { text: 'Set you location, then swipe away', color: '#03A9F4' }
]

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: null,
        }
    }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token')

        if(token) {
            this.props.navigation.navigate('main')
        } else {
            this.setState({ token: false })
        }
    }

    onSlideComplete = () => {
        this.props.navigation.navigate('auth')
    }

    render() {
        if (_.isNull(this.state.token)) {
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>LOADING</Text>
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>

                <Slides data={SLIDE_DATA} onComplete={this.onSlideComplete} />
            </View>
        )
    }
}

export default WelcomeScreen