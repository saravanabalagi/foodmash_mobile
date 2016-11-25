import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabIcon extends Component {
    render() {
        const color = this.props.selected ? 'red' : 'black';
        return (
            <View style={{alignItems: 'center'}}>
                { this.props.tabIcon !=null &&
                <Icon
                    name={this.props.tabIcon}
                    size={24}
                    color={color}
                /> }
                <Text style={{color: color}}>{this.props.title}</Text>
            </View>
        );
    }
}

export default TabIcon;
