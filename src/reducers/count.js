import { combineReducers } from 'redux';
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

const getProducts = products => ({
	type: FETCH_PRODUCTS,
	products
})

export const getAllProducts = () => dispatch => {
  fetch('../api/shop.json')
    .then(response => response.json())
    .then(json => {
			return dispatch(getProducts(json))
		})
}

const goods = (state = [], action) => {
	switch(action.type) {
		case FETCH_PRODUCTS:
			return	action.products
		default:
			return state
	}
}

const byId = (state = {}, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return {
				...state,
				...action.products.reduce((obj, product) => {
					obj[product.id] = product;
					return obj;
				}, {})
			};
		default:
			return state;
	}
};

const visibleIds = (state = [], action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.products.map(product => product.id);
		default:
			return state;
	}
};

export default combineReducers({
	goods,
	byId,
	visibleIds
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = state =>
	state.visibleIds.map(id => getProduct(state, id));
