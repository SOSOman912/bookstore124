import React from 'react'
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden,selectCurrentUser } from '../../redux/cart/cart.selectors';
import { LinkContainer, LOGO, LogoContainer,  HeaderContainer, OptionsContainer, OptionLink } from './header.styles.jsx'
import { togglecategoryhidden } from '../../redux/shop/shop.actions';
import { selectCategoryhidden } from '../../redux/shop/shop.selectors';
import { withRouter } from 'react-router-dom'
const Header = ({currentUser, hidden, shake,togglecategoryhidden, categoryhidden,history}) => {

const ReDirectToHomePage = () => {
	history.push('/');
}

const SignOutandRedirect = () => {
	history.push('/')
	auth.signOut();
}

	return(
		<HeaderContainer >
					<LogoContainer onClick={() => ReDirectToHomePage()}>
						<LOGO/>
					</LogoContainer>
					<OptionsContainer>
						<LinkContainer>	
							{
								currentUser?
								<OptionLink to='/Portfolio'> {currentUser.username} </OptionLink>
								:
								<OptionLink to='/signin'>SIGN IN</OptionLink>
							}
							<OptionLink to='/shop'>
								CATEGORY
							</OptionLink> 
							{
								currentUser?
								<OptionLink as='div' to='/' onClick={() => SignOutandRedirect()}> SIGN OUT </OptionLink>
								:
								<OptionLink to='/signin'></OptionLink>
							}
							</LinkContainer>
						<CartIcon/>
				
					</OptionsContainer>
					{
					   hidden ? null :
					<CartDropDown />
					}
	
		</HeaderContainer>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser : selectCurrentUser,
	hidden: selectCartHidden,
	categoryhidden: selectCategoryhidden
});

const mapDispatchToProps = (dispatch) => ({
	togglecategoryhidden: () => dispatch(togglecategoryhidden())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));