import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import DishMini from '../views/DishMini';

class DishList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.parent}>
                { this.props.dishCategory && this.props.dishCategory.inProgress && <Text> inProgress </Text> }
                { this.props.dishCategory && this.props.dishCategory.dishes &&
                    this.props.dishCategory.dishes.map((dish) => {
                        return <DishMini key={dish.id}
                                         dish={dish}
                                         dishCategoryId={this.props.dishCategory.id} />
                    })
                }
                { this.props.dishCategory && this.props.dishCategory.error != null && !this.props.dishCategory.inProgress && <Text> {this.props.dishCategory.error.toString()} </Text> }
            </View>
        );

    }

}

const s = StyleSheet.create({

});

export default DishList;