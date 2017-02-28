import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native'

import {connect} from 'react-redux';
import {fetchLocation} from '../reducers/location/locationActions';
import {fetchCity} from '../reducers/city/cityActions';
import {fetchUser} from '../reducers/user/userActions';
import {Actions} from 'react-native-router-flux';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DishCategoryList from '../containers/DishCategoryList';

@connect((store) => {
    return {
        location_id: store.user.user.location_id,
        locations: store.location.locations,
        cities: store.city.cities
    };
})

class Browse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        if(this.props.location_id!=null)
            this.props.dispatch(fetchLocation(this.props.location_id));
        else this.props.dispatch(fetchUser());
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.location_id!=null && this.props.location_id!=nextProps.location_id)
            this.props.dispatch(fetchLocation(nextProps.location_id));
        let location = nextProps.location_id? nextProps.locations[nextProps.location_id]:null;
        let city = location? nextProps.cities[location.city_id]:null;
        if(location && city==null) this.props.dispatch(fetchCity(location.city_id));
    };

    getLocation = () => { return (this.props.location_id)?this.props.locations[this.props.location_id]:null };
    getCity = () => { return (this.getLocation())?this.props.cities[this.getLocation().city_id]:null };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <TouchableOpacity onPress={()=>Actions.selectLocation()}>
                        <View style={s.titleWrapper}>
                            <MaterialIcon style={s.locationIcon} name={"location-on"} size={35} color={"#e16800"}/>
                            <View style={s.locationWrapper}>
                                <Text style={s.location}> { this.getLocation() ? this.props.locations[this.props.location_id].name : "Loading"}</Text>
                                {
                                    this.getCity() &&
                                    <Text style={s.city}>{ this.getCity().name.toUpperCase() }</Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <DishCategoryList/>
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        flex: 1
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#EEE',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationWrapper: {
        alignItems: 'center'
    },
    location: { fontSize: 20 },
    city: { fontSize: 10, paddingTop: 3 },
    locationIcon: {  },
});

export default Browse;