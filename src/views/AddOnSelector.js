import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native'

import AddOnTypeLink from '../views/AddOnTypeLink';
import AddOnLink from '../views/AddOnLink';

class AddOnSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_add_on_type_link_id: null
        }
    }

    setSelectedAddOnTypeLinkId = (add_on_type_link_id) => { this.setState({selected_add_on_type_link_id: add_on_type_link_id}); };
    getSelectedAddOnTypeLink() {
        console.log("Add On Type Links: ", this.props.add_on_type_links);
        return this.props.add_on_type_links.filter(add_on_type_link => add_on_type_link.id === this.state.selected_add_on_type_link_id)[0]; }

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true} showsHorizontalScrollIndicator={false} >
                    { this.props.add_on_type_links.map((add_on_type_link, index) => {
                        return (
                            <AddOnTypeLink key={add_on_type_link.id}
                                           index={index}
                                           selected={add_on_type_link.id === this.state.selected_add_on_type_link_id}
                                           select_add_on_type_link={this.setSelectedAddOnTypeLinkId}
                                           add_on_type_link={add_on_type_link} />
                        )
                    }) }
                </ScrollView>
                <View style={s.addOnLinkListView}>
                    {this.state.selected_add_on_type_link_id && this.getSelectedAddOnTypeLink() &&
                        this.getSelectedAddOnTypeLink().add_on_links.map(add_on_link => {
                        return (
                            <AddOnLink key={add_on_link.id}
                                       add_on_link={add_on_link} />
                        )
                    })}
                </View>
            </View>
        );

    }

}

const s = StyleSheet.create({
    addOnLinkListView: {
        padding: 20
    },
    tabBar: {
        marginLeft: 20,
        marginRight: 20
    }
});

export default AddOnSelector;