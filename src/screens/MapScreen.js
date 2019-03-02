import React from 'react'
import { MapView } from 'expo';
import { connect } from 'react-redux'
import { Button, Icon } from 'react-native-elements';
import { View } from 'react-native'

import * as actions from '../actions'

class MapScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => { return <Icon name="my-location" size={30} color={tintColor} /> }
    }

    constructor(props) {
        super(props)
        this.state = {
            region: {
                longitude: -122,
                latitude: 37,
                longitudeDelta: 0.04,
                latitudeDelta: 0.09
            }
        }
    }

    onRegionChangeComplete = (region) => {
        this.setState({ region })
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate("deck")
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        large
                        title="Search this area"
                        backgroundColor="#009688"
                        icon={{ name: 'search', color: 'white' }}
                        onPress={this.onButtonPress}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    }
}

export default connect(null, actions)(MapScreen)