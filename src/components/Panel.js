import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
export default class Panel extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		const { product, buyNum } = this.props;
		return (
			<div id={ product.id } className="cart-list-li" key={ product.id }>
				<Row>
					<Col span={3}>
						<div className="img">
							<img src={`../images/${product.src}`} alt=""/>
						</div>
					</Col>
					<Col span={9}>
						<div className="text"><Link to={`/detail/${product.id}`}>{ product.name }</Link></div>
					</Col>
					<Col span={4}>
						<div className="text">￥{ product.price }</div>
					</Col>
					<Col span={4}>
						<div className="text">{ buyNum }</div>
					</Col>
					<Col span={4}>
						<div className="text">￥{ buyNum*product.price }</div>
					</Col>
				</Row>
			</div>
		)
	}
}
