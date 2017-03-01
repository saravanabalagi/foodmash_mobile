import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ListView,
    Keyboard,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {updateCity} from '../reducers/city/cityActions';
import {updateLocation} from '../reducers/location/locationActions';
import {updateUser} from '../reducers/user/userActions';
import {dropDishCategories} from '../reducers/dishCategory/dishCategoryActions';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

@connect((store) => {
    return {
        user: store.user.user,
        city: store.city,
        location: store.location
    }
})


class SelectLocation extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (a,b)=>a!==b});
        this.state = {
            query: "",
            locations: [],
            inProgress: false
        };
        this.subscription = null;
    }

    componentDidMount = () => { this.componentWillReceiveProps(this.props); };
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.getCable()!=null && this.subscription==null)
            this.subscription = nextProps.getCable().subscriptions.create({channel: "LocationChannel"},{
                connected: function() { console.log("cable: locations connected") },
                disconnected: function() { console.log("cable: locations disconnected") },
                query: (data)=> { this.subscription.perform('search',{data:data}) },
                setLocation: (locationId)=> { this.subscription.perform('set_location',{id:locationId}) },
                received: (data) => {
                    if(data.hasOwnProperty('locations')) this.setState({locations:data.locations,inProgress:false});
                    if(data.hasOwnProperty('message') && data.message=="Successfully changed preferred location") {
                        if(data.hasOwnProperty('user')) this.props.dispatch(updateUser(data.user));
                        if(data.hasOwnProperty('location')) {
                            this.props.dispatch(updateLocation({id: data.location.id, name: data.location.name, city_id: data.location.city_id}));
                            this.props.dispatch(updateCity(data.location.city));
                        }
                        this.props.dispatch(dropDishCategories());
                        Actions.app();
                    }
                }
            });
    };

    handleChangeSearchQuery = (text) => {
        this.setState({query: text}, ()=>{
            if(text.length!=0)
                this.setState({inProgress: true}, ()=>this.subscription.query(this.state.query));
            if(text.length==0) this.setState({locations:[]});
        });
    };

    render() {
        return (
            <View style={s.parent}>
                <View style={s.titleBar}>
                    <View style={s.titleWrapper}>
                        <MaterialIcon style={s.titleIcon} name={"location-on"} size={20} color={"#e16800"}/>
                        <Text style={s.title}>Select IT Park</Text>
                    </View>
                </View>
                <View style={s.mainView}>
                    <View style={s.locationInputWrapper}>
                        <MaterialIcon style={s.locationIcon} name='business' size={30} color={'#e16800'} />
                        <TextInput
                            returnKeyType={"search"}
                            autoCorrect={false}
                            autoFocus={true}
                            underlineColorAndroid={"#e16800"}
                            style={s.locationInput}
                            onChangeText={this.handleChangeSearchQuery}
                            placeholder="Type your IT Park here" />
                        { this.state.query.length>0 &&
                            this.state.locations.length!=0 &&
                            <Icon style={s.downIcon} name='angle-down' size={20} color={'#e16800'} /> }
                    </View>
                    { this.state.query.length>0 &&
                        this.state.locations.length==0 &&
                        !this.state.inProgress &&
                        <View style={s.noLocationLayout}>
                            <MaterialIcon name={"location-off"} size={100} color={"#e16800"}/>
                            <Text style={s.noLocationTopText}>No location found with "{this.state.query}" found</Text>
                            <Text style={s.noLocationBottomText}>Try a different one</Text>
                        </View>
                    }
                    <ListView style={s.locationList}
                              keyboardShouldPersistTaps={"always"}
                              dataSource={this.ds.cloneWithRows(this.state.locations)}
                              enableEmptySections={true}
                              renderRow={location=>{
                                  return <TouchableOpacity style={s.locationTextWrapper}
                                                           onPress={()=>{
                                                               Keyboard.dismiss();
                                                               if(this.props.user.location_id==location.id) Actions.app();
                                                               else this.subscription.setLocation(location.id)}}>
                                            <Text style={s.locationText}>{location.name}, {location.city.name}</Text>
                                      </TouchableOpacity>
                              }}>
                    </ListView>
                </View>
            </View>
        );
    }

}

const s = StyleSheet.create({
    parent: { flex: 1 },
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
    title: { fontSize: 20 },
    titleIcon: { marginRight: 5 },
    mainView: { padding: 10, flex: 1 },


    noLocationLayout: {
        paddingTop: 20,
        alignItems: 'center'
    },
    noLocationTopText: {
        fontSize: 15,
        marginTop: 20
    },
    noLocationBottomText: {
        fontSize: 17,
        padding: 5
    },



    locationInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: [0,10],
        marginBottom: 10
    },
    locationIcon: { marginRight: 15 },
    downIcon: { margin: 15 },
    locationInput: {
        flex: 1,
        fontSize: 17
    },
    locationList: { },
    locationTextWrapper: {
        backgroundColor: '#e16800',
        borderRadius: 5,
        padding: 15,
        marginBottom: 4,
    },
    locationText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#FFF'
    },
});

export default SelectLocation;