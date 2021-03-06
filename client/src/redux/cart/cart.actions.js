import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
	type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item
})


export const clearItemFromCart = item => ({
	type: CartActionTypes.CLEAR_ITEM_FROM_CART,
	payload: item
})

export const removeItem = item => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item
})

export const setCurrentUser = user => ({
	type: CartActionTypes.SET_CURRENT_USER,
	payload: user
});

export const cleanALlItemsFromCart = () => ({
	type: CartActionTypes.CLEAN_ALL_ITEM
})