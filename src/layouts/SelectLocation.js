import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {selectCityAndFetchLocations, fetchCities} from '../reducers/city/cityActions';
import {selectLocation} from '../reducers/location/locationActions';

@connect((store) => {
    return {
        city: store.city,
        location: store.location
    }
})


export default class SelectLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount = () => { this.props.dispatch(fetchCities()); };

    render() {
        return (
            <View style={s.parent}>
                { this.props.city.inProgress && <Text> inProgress </Text> }
                {
                    this.props.city.cities &&
                    this.props.city.cities.map((city) => {
                        return <TouchableHighlight
                            style={s.city}
                            onPress={() => this.props.dispatch(selectCityAndFetchLocations(city.id))}
                            key={city.id}>
                            <Text> { city.name } {this.props.city.selected === city.id? "(Selected)":"" } </Text>
                        </TouchableHighlight>
                    })
                }
                { this.props.city.error != null && !this.props.city.inProgress && <Text> {this.props.city.error.toString()} </Text> }

                { this.props.location.inProgress && <Text> inProgress </Text> }
                {
                    this.props.location.locations &&
                    this.props.location.locations.map((location) => {
                        return <TouchableHighlight
                            style={s.location}
                            onPress={() => this.props.dispatch(selectLocation(location.id, this.props.city.fetched))}
                            key={location.id}>
                            <Text> { location.name } {this.props.location.selected === location.id? "(Selected)":"" } </Text>
                        </TouchableHighlight>
                    })
                }
                { this.props.location.error != null && !this.props.location.inProgress && <Text> {this.props.location.error.toString()} </Text> }

            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: {
        padding: 30
    },
    location: {
        margin: 10,
        padding: 10,
        backgroundColor: '#DDD'
    },
    city: {
        margin: 10,
        padding: 10,
        backgroundColor: '#EEE'
    }
});