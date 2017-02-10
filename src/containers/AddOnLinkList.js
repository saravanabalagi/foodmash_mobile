import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import AddOnLink from './AddOnLink';
import {fetchAddOnLink} from '../reducers/addOnLink/addOnLinkActions';
import {connect} from 'react-redux';

@connect((store, props)=>{
    return {
        addOnLinks: props.addOnTypeLink.add_on_link_ids.map(addOnLinkId => store.addOnLink.addOnLinks[addOnLinkId]).filter(Boolean)
    }
})

class AddOnLinkList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addOnLinkIds: []
        }
    }

    componentWillMount = () => { this.props.addOnTypeLink.add_on_link_ids.map(addOnLinkId => this.props.dispatch(fetchAddOnLink(addOnLinkId))); };


    render() {
        return (
            <View style={s.parent}>
                {
                    this.props.addOnLinks.map(addOnLink => {
                        return (
                            <AddOnLink key={addOnLink.id}
                                       selected={this.props.selectedAddOnLinkIds.includes(addOnLink.id)}
                                       toggleSelect={()=>this.props.toggleSelectAddOnLink(addOnLink)}
                                       addOnLink={addOnLink}/>
                        )
                    })
                }
            </View>
        );

    }

}

const s = StyleSheet.create({
    parent: {
        padding: 20
    }
});

export default AddOnLinkList;