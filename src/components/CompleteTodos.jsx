import React from 'react';

const style = {
	backgroundColor: '#ffffe0',
	width: '400px',
	minHeight: '200px',
	padding: '8px',
	margin: '8px',
	borderRadius: '8px',
};

export const CompleteTodos = (props) => {
	const { todo, onClickBack } = props;
	return (
		<div style={style}>
			<p className='title'>完了のTODO</p>
			<ul>
				{todo.map((todo, index) => {
					return (
						<div key={todo} className='list-row'>
							<li>{todo}</li>
							<button onClick={() => onClickBack(index)}>戻す</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
};
