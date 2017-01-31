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
import {connect} from 'react-redux';

import {fetchVariant} from '../reducers/variant/variantActions';
import {fetchVariantCategory} from '../reducers/variantCategory/variantCategoryActions';
import {fetchAddOnTypeLink} from '../reducers/addOnTypeLink/addOnTypeLinkActions';
import {fetchAddOnLink} from '../reducers/addOnLink/addOnLinkActions';

@connect((store,props) => {
    return {
        variant: store.variant.variants[props.dishVariant.variant_id],
        variantCategories: store.variantCategory.variantCategories,
        addOnTypeLinks: store.addOnTypeLink.addOnTypeLinks,
        addOnLinks: store.addOnLink.addOnLinks
    }
})

class AddOnSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            variantCategory: null,
            addOnTypeLinks: [],
            addOnLinksOfSelectedAddOnTypeLink: [],
            selectedAddOnTypeLink: null
        }
    }

    componentWillMount = () => { this.componentWillReceiveProps(this.props) };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.variant==null) this.props.dispatch(fetchVariant(this.props.dishVariant.variant_id));
        if((nextProps.variant!=null && this.state.variantCategory==null) || nextProps.variant!=this.props.variant) {
            if(nextProps.variant!=this.props.variant) this.setState({
                variantCategory: null,
                addOnTypeLinks: [],
                addOnLinksOfSelectedAddOnTypeLink: [],
                selectedAddOnTypeLink: null
            });
            if(nextProps.variant.variant_category_id!=null)
                this.props.dispatch(fetchVariantCategory(nextProps.variant.variant_category_id));
            this.setState({variantCategory: nextProps.variantCategories[nextProps.variant.variant_category_id]}, this.fetchAddOnTypeLinks);
        }
        if(this.state.variantCategory!=null) this.fetchAddOnTypeLinks(nextProps.addOnTypeLinks);
        if(this.state.selectedAddOnTypeLink!=null) this.fetchAddOnLinks();
    };

    fetchAddOnTypeLinks = (nextPropsAddOnTypeLinks) => {
        let addOnTypeLinkIds = [];
        addOnTypeLinkIds.push(...this.props.dishVariant.add_on_type_link_ids);
        this.props.variant && addOnTypeLinkIds.push(...this.props.variant.add_on_type_link_ids);
        this.state.variantCategory && addOnTypeLinkIds.push(...this.state.variantCategory.add_on_type_link_ids);
        addOnTypeLinkIds.map(addOnTypeLinkId => this.props.dispatch(fetchAddOnTypeLink(addOnTypeLinkId)));
        let addOnTypeLinks = nextPropsAddOnTypeLinks || this.props.addOnTypeLinks;
        let requiredAddOnTypeLinks = addOnTypeLinkIds
            .map(addOnTypeLinkId => addOnTypeLinks[addOnTypeLinkId])
            .filter(Boolean);
        if(requiredAddOnTypeLinks.length>0 && this.state.selectedAddOnTypeLink == null)
            this.setState({selectedAddOnTypeLink: requiredAddOnTypeLinks[0]}, this.fetchAddOnLinks);
        this.setState({addOnTypeLinks: requiredAddOnTypeLinks});
    };

    fetchAddOnLinks = () => {
        this.state.selectedAddOnTypeLink.add_on_link_ids.map(addOnLinkId => this.props.dispatch(fetchAddOnLink(addOnLinkId)));
        this.setState({addOnLinksOfSelectedAddOnTypeLink:
            this.state.selectedAddOnTypeLink.add_on_link_ids
                .map(addOnLinkId => this.props.addOnLinks[addOnLinkId])
                .filter(Boolean)});
    };

    render() {
        return (
            <View style={s.parent}>
                <ScrollView style={s.tabBar} horizontal={true} showsHorizontalScrollIndicator={false} >
                    { this.state.addOnTypeLinks.map(addOnTypeLink => {
                        return (
                            <AddOnTypeLink key={addOnTypeLink.id}
                                           selected={this.state.selectedAddOnTypeLink && addOnTypeLink.id === this.state.selectedAddOnTypeLink.id}
                                           selectAddOnTypeLink={(addOnTypeLink) => this.setState({selectedAddOnTypeLink: addOnTypeLink}, this.fetchAddOnLinks)}
                                           addOnTypeLink={addOnTypeLink} />
                        )
                    }) }
                </ScrollView>
                <View style={s.addOnLinkListView}>
                    {this.state.selectedAddOnTypeLink &&
                        this.state.addOnLinksOfSelectedAddOnTypeLink.map(addOnLink => {
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