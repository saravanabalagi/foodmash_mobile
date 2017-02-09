import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native'

import AddOnLinkList from '../views/AddOnLinkList';
import {connect} from 'react-redux';

import {fetchVariant} from '../reducers/variant/variantActions';
import {fetchAddOnType} from '../reducers/addOnType/addOnTypeActions';
import {fetchVariantCategory} from '../reducers/variantCategory/variantCategoryActions';
import {fetchAddOnTypeLink} from '../reducers/addOnTypeLink/addOnTypeLinkActions';
import ScrollableTabView from 'react-native-scrollable-tab-view';

@connect((store,props) => {
    return {
        variant: store.variant.variants[props.dishVariant.variant_id],
        variantCategories: store.variantCategory.variantCategories,
        addOnTypeLinks: store.addOnTypeLink.addOnTypeLinks,
        addOnTypes: store.addOnType.addOnTypes
    }
})

class AddOnSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            variantCategory: null,
            addOnTypeLinks: [],
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
                selectedAddOnTypeLink: null
            });
            if(nextProps.variant.variant_category_id!=null)
                this.props.dispatch(fetchVariantCategory(nextProps.variant.variant_category_id));
            this.setState({variantCategory: nextProps.variantCategories[nextProps.variant.variant_category_id]}, this.fetchAddOnTypeLinks);
        }
        if(this.state.variantCategory!=null) this.fetchAddOnTypeLinks(nextProps.addOnTypeLinks);
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
            this.setState({selectedAddOnTypeLink: requiredAddOnTypeLinks[0]});
        this.setState({addOnTypeLinks: requiredAddOnTypeLinks});
        this.fetchAddOnTypes(requiredAddOnTypeLinks);
    };

    fetchAddOnTypes = (addOnTypeLinks) => { addOnTypeLinks.map(addOnTypeLink => this.props.dispatch(fetchAddOnType(addOnTypeLink.add_on_type_id))); };

    render() {
        return (
            <View style={s.parent}>
                {
                    this.state.addOnTypeLinks.length>0 &&
                    <ScrollableTabView style={s.tabs}>
                        {
                            this.state.addOnTypeLinks.map((addOnTypeLink, index) => {
                                return (
                                    <AddOnLinkList
                                        selectedAddOnLinkIds={this.props.selectedAddOnLinkIds}
                                        toggleSelectAddOnLink={this.props.toggleSelectAddOnLink}
                                        key={addOnTypeLink.id}
                                        tabLabel={this.props.addOnTypes[addOnTypeLink.add_on_type_id] ? this.props.addOnTypes[addOnTypeLink.add_on_type_id].name : "Loading.... (" + (index + 1) + ")"}
                                        addOnTypeLink={addOnTypeLink}/>
                                )
                            })
                        }
                    </ScrollableTabView>
                }
            </View>
        );

    }

}

const s = StyleSheet.create({
    tabs: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    addOnLinkListView: {
        padding: 20
    },
    tabBar: {
        marginLeft: 20,
        marginRight: 20
    }
});

export default AddOnSelector;