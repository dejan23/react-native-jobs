import React from 'react'
import { View, Text, ScrollView, Linking, Platform } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { MapView } from 'expo'

class ReviewScreen extends React.Component {
    static navigationOptions = ({ navigation, tintColor }) => {
        return {
            headerTitle: 'Review Jobs',
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('settings')}
                    title="Settings"
                    type="clear"
                />
            ),
            // headerStyle: {
            //     marginTop: Platform.OS === 'android' ? 24 : 0
            // },
        }
    }

    renderLikedJobs = () => {
        return this.props.likes.map(job => {
            const {
                company,
                formattedRelativeTime,
                url,
                longitude,
                latitude,
                jobtitle,
                jobkey
            } = job

            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }

            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}

                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply Now!"
                            backgroundColo="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            )
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }
}

const styles = {
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContetn: 'space-around',
    },
    italics: {
        fontStyle: 'italic',
    },
}

const mapStateToProps = state => {
    return { likes: state.likes }
}

export default connect(mapStateToProps)(ReviewScreen)