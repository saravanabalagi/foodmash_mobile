import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Animated,
    Easing
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
    }

    componentDidMount = () => { this.spin(); };

    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                easing: Easing.linear,
                duration: 2000
            }
        ).start(() => this.spin());
    };

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <View style={s.parent}>
                <Animated.View
                    style={{transform: [{rotate: spin}]}}>
                    <Icon style={s.icon} name={"circle-o-notch"} size={30} color={"#F37521"}/>
                </Animated.View>
                <Text style={s.text}> {this.props.text? this.props.text : "Loading" } </Text>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        alignItems: 'center',
        padding: 20
    },
    icon: {
    },
    text: {
        marginTop: 10,
        fontSize: 15
    }
});

export default Loading;