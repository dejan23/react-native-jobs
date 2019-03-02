import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import * as actions from '../actions'

class SettingsScreen extends React.Component {
    render() {
        return (
            <View>
                <Button
                    title="Reset Liked Jobs"
                    large
                    icon={{ name: 'delete-forever', color: 'white'}}
                    buttonStyle={{
                        backgroundColor:"red"
                    }}
                    onPress={this.props.clearLikedJobs}
                />
            </View>
        )
    }
}

export default connect(null, actions)(SettingsScreen)