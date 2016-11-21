import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

class NavBarIcon extends Component {
    render() {
        return (
            <Icon
                name={this.props.navIcon}
                size={24}
                color={'red'}
            />
        );
    }
}

export default NavBarIcon;