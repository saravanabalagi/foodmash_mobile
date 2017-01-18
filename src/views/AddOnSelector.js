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
            selectedAddOnTypeLinkId: null
        }
    }

    setSelectedAddOnTypeLinkId = (addOnTypeLinkId) => { this.setState({selectedAddOnTypeLinkId: addOnTypeLinkId}); };
    getSelectedAddOnTypeLink() { return this.props.addOnTypeLinks.filter(addOnTypeLink => addOnTypeLink.id === this.state.selectedAddOnTypeLinkId)[0]; }

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true} showsHorizontalScrollIndicator={false} >
                    { this.props.addOnTypeLinks.map((addOnTypeLink, index) => {
                        return (
                            <AddOnTypeLink key={addOnTypeLink.id}
                                           index={index}
                                           selected={addOnTypeLink.id === this.state.selectedAddOnTypeLinkId}
                                           selectAddOnTypeLink={this.setSelectedAddOnTypeLinkId}
                                           addOnTypeLink={addOnTypeLink} />
                        )
                    }) }
                </ScrollView>
                <View style={s.addOnLinkListView}>
                    {this.state.selectedAddOnTypeLinkId && this.getSelectedAddOnTypeLink() &&
                        this.getSelectedAddOnTypeLink().add_on_links.map(addOnLink => {
                        return (
                            <AddOnLink key={addOnLink.id}
                                       addOnLink={addOnLink} />
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