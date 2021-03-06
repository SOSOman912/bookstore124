import axios from 'axios';

export const addItemToCart = (state,cartItemToAdd) => {
	const {cartItems, currentUser } = state;
	console.log("cartItems",state);
	console.log("cartItemToAdd",cartItemToAdd);
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id
		);

	if (existingCartItem) {
	const newCartList1 = cartItems.map(cartItem =>
			cartItem.id === cartItemToAdd.id
				? {...cartItem, quantity: cartItem.quantity + 1}
				: cartItem　
			)
	console.log("newCartList1:",newCartList1);
	axios.post('/api/updatecartlist', {
		cartlist: newCartList1,
		users:currentUser
	})
	return newCartList1;
	}
	const newCartList2 = [...cartItems, { ...cartItemToAdd, quantity: 1}];
	console.log("newCartList2:",newCartList2);
	axios.post('/api/updatecartlist', {
		cartlist: newCartList2,
		users:currentUser
	})
	return newCartList2;
}

export const removeItemFromCart = (state, cartItemToRemove) => {
	const {cartItems, currentUser } = state;
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToRemove.id
		);

	if(existingCartItem.quantity === 1) {
		const newCartlist3 = cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
	axios.post('/api/updatecartlist', {
		cartlist: newCartlist3,
		users:currentUser
	})
		return newCartlist3;
	}

	const newCartlist4 = cartItems.map(
		cartItem =>
			cartItem.id === cartItemToRemove.id ?
				{ ...cartItem, quantity: cartItem.quantity - 1}
				: cartItem
			);
	axios.post('/api/updatecartlist', {
		cartlist: newCartlist4,
		users:currentUser
	})
		return newCartlist4
}

export const clearItemFromCart = (state, cartItemToClear) => {
	const { currentUser } = state;
	console.log(cartItemToClear);
	console.log(state);
	const newCartlist5 = state.cartItems.filter(item => 
		item.id !== cartItemToClear.id
		)
	console.log(newCartlist5);
	axios.post('/api/updatecartlist', {
		cartlist: newCartlist5,
		users:currentUser
	})

	return newCartlist5;
}

export const clearAllItemsFromCart = (state) => {
	const {currentUser} = state;
	axios.post('/api/updatecartlist', {
		cartlist:[],
		users:currentUser
	})
	return [];
} 

export const checkingCartList = (cartlist) => {
	if (cartlist == null) {
		return [];
	} else {
		return cartlist.cart_list;
	}
	
}