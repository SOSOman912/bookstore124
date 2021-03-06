import React from 'react';
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems , selectCurrentUser} from '../../redux/cart/cart.selectors'
import { withRouter } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { CartDropDownMenu, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx'
import { togglelogininmessagehidden } from '../../redux/shop/shop.actions'

import { createStructuredSelector } from 'reselect'


const CartDropDown = ({currentUser, cartItems, history, dispatch}) => (
	<CartDropDownMenu>
		<CartItems>
		{
			cartItems.length ? 
			(cartItems.map(cartItem => 
							(<CartItem key={cartItem.id} item={cartItem} />)
			))
			:
			(<EmptyMessage>Your cart is empty</EmptyMessage>)
		}
		</CartItems>
		<CustomButton onClick={() => {
			if (currentUser) {
				history.push('/checkout');
				dispatch(toggleCartHidden());
			} else {
				dispatch(togglelogininmessagehidden());
			}

		}}>GO TO CHECKOUT</CustomButton>
	</CartDropDownMenu>
)

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems ,
	currentUser: selectCurrentUser
})

export default withRouter(connect(mapStateToProps)(CartDropDown));