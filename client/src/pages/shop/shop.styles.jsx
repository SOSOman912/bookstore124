import styled from 'styled-components';
import filtering from '../../components/Filtering/filtering.component.jsx';

export const ShopPageContainer = styled.div`
	width:1525px;
	min-height:90vh;

	@media (max-width: 1920px) {
	  	width:1152px;
	  }

	  @media (max-width: 1280px) {
	  	width:1200px;
	  }
`

export const FirstSection = styled.div`
	width:20%;
	height:100%;
	
`

export const SecondSection = styled.div`
	width:80%;
	height:100%;

`

export const FilteringArea = styled(filtering)`
	height:100%;
	width:80%;
`

export const Content = styled.div`
	width:100%;
	height:100%;
	display:flex;
`