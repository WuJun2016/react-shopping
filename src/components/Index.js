import React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';

const Index = ({goods}) => (
	<div className='container fl main-index'>
		<QueueAnim>
			{goods.map(product => (
				<div id={product.id} className='product-list fl' key={'a' + product.id}>
					<img src={`../images/${product.src}`} alt='图片' />
					<p>{product.price}</p>
					<Link to={`/detail/${product.id}`}>{product.name}</Link>
				</div>
			))}
		</QueueAnim>
	</div>
)

const mapStateToProps = state => ({
	goods: state.count && state.count.goods
});

export default connect(mapStateToProps)(Index);
