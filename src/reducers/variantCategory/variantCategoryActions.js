import axios from 'axios';
import store from '../../store';

export function fetchVariantCategory(id) {
    const url = '/variant_categories/' + id.toString();
    return (dispatch) => {
        if(store.getState().variantCategory.variantCategories[id] != null) return;
        dispatch({type: "FETCH_VARIANT_CATEGORY_IN_PROGRESS"});
        axios.get(url)
            .then((response) => { dispatch({ type: "FETCH_VARIANT_CATEGORY_FULFILLED", payload: response.data}); })
            .catch((error) => { dispatch({ type: "FETCH_VARIANT_CATEGORY_FAILED", payload: error }); });
    };
}