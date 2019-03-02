import React from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width

class Slides extends React.Component {
    renderLastSlide(i) {
        if(i === this.props.data.length - 1) {
            return (
                <Button 
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            )
        }
    }
    
    renderSlides() {
        return this.props.data.map((slide, i) => {
            return (
                <View
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                    key={slide.text}
                >
                    <Text style={styles.slideTextStyle}>{slide.text}</Text>

                    {this.renderLastSlide(i)}
                </View>
            )
        })
    }

    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    slideTextStyle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        margin: 20
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
    },
}

export default Slides