import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { addProductToCart, decCount, decProductFromCart } from '../reducers/cart';

const Detail = ({ match, dispatch, cart, count }) => {
	const id = match.params.topicId;

	const handlerAdd = () => {
		dispatch(addProductToCart(id));
	};

	const handlerDec = () => {
		dispatch(decCount(id));
		if (!cart.quantityId[id]) {
			dispatch(decProductFromCart(match.params.topicId));
		}
	};

	const product = count[id];
	let Addtoggle;
	if (!cart.quantityId[id]) {
		console.log()
		Addtoggle = (
			<a onClick={ handlerAdd } className='buy'>
				加入购物车
			</a>
		);
	} else {
		Addtoggle = (
			<div className='detail-cart'>
				<a onClick={ handlerAdd } className='toggle-add'>
					+
				</a>
				<div className='toggle-num'>
					{ cart.quantityId[match.params.topicId] }
				</div>
				<a onClick={ handlerDec } className='toggle-add'>
					-
				</a>
			</div>
		);
	}

	return (
		<div className='detail fl'>
			<div className='detail-header'>
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link to='/'>Home</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{ product.name }</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div className='detail-content clear'>
				<div className='fl'>
					<img src={ `../images/${product.src}` } alt='' />
				</div>
				<div className='fl content-right'>
					<div className='name'>{ product.name }</div>
					<div className='mashu'>
						码数:
						{product.mashu.map(num => (
							<span className='num' key={ num }>
								{ num }
							</span>
						))}
					</div>
					<div className='toggle'>{ Addtoggle }</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	count: state.count.byId,
	cart: state.cart
});

export default connect(mapStateToProps)(Detail);
