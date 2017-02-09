import axios from 'axios';
import store from '../../store';

export function fetchVariantCategory(id) {
    const url = '/variant_categories/' + id.toString();
    return (dispatch) => {
        if(store.getState().variantCategory.variantCategories[id] != null
            || store.getState().variantCategory.inProgress.includes(id)) return;
        dispatch({type: "FETCH_VARIANT_CATEGORY_IN_PROGRESS", id: id});
        axios.get(url)
            .then((response) => { dispatch({type: "FETCH_VARIANT_CATEGORY_FULFILLED", payload: response.data, id: id}); })
            .catch((error) => { dispatch({type: "FETCH_VARIANT_CATEGORY_FAILED", payload: error, id: id}); });
    };
}