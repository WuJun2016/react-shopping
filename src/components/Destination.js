import React from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../reducers/count';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { addhistory } from '../reducers/history';
import { clearproduct } from '../reducers/cart';
import { Modal } from 'antd';
import Panel from './Panel';

class Destination extends React.Component {

	state = { visible: false };
	showModal = () => {
		this.setState({
			visible: true
		});
	}

	handleOk = () => {
		const { cart, dispatch } = this.props;
		const order = cart.addIds.reduce((obj, num) => {
			obj[num] = cart.quantityId[num];
			return obj;
		}, {});
		dispatch(addhistory(order, new Date().getTime()));
		dispatch(clearproduct());
		this.setState({
			visible: false
		});
	}

	handleCancel = () => {
		this.setState({
			visible: false
		});
	}

	clearProduct = () => {
		const { dispatch } = this.props;
		dispatch(clearproduct());
	}

	render() {
		const { cart, count } = this.props;
		const carts = cart.addIds.map(id => getProduct(count, id));

		return (
			<div className='cart-list fl'>
				<div className='cart-list-title'>
					<Row>
						<Col span={8}>商品信息</Col>
						<Col span={4} />
						<Col span={4}>单价</Col>
						<Col span={4}>数量</Col>
						<Col span={4}>金额</Col>
					</Row>
				</div>
				<QueueAnim type={['right', 'left']}>
					{carts.map((product, index) => (
						<Panel product={ product } buyNum={ cart.quantityId[product.id] } key={ index }/>
					))}
				</QueueAnim>

				<div className='total'>
					<div onClick={ this.clearProduct } className='total-clear'>
						清空
					</div>
					<div className="right">
						<div className='total-font'>
							<span className='total-symbol'>&nbsp;￥</span>
							{cart.addIds.reduce((sum, productId) => {
								return (
									sum +
									count.byId[productId]['price'] * cart.quantityId[productId]
								);
							}, 0)}
						</div>
						<div className='total-all' onClick={ this.showModal }>
							去结算
						</div>
					</div>
				</div>
				<Modal
					title='提示框'
					visible={ this.state.visible }
					onOk={ this.handleOk }
					onCancel={ this.handleCancel }
				>
					<h5>确认购买？</h5>
					<p>（购买后请到购买记录查看）</p>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	count: state.count,
	cart: state.cart
});

export default connect(mapStateToProps)(Destination);
