import React from 'react';

export const IncompleteTodos = (props) => {
	const { todos, onClickComplete, onClickDelete } = props;
	return (
		<div className='incomplete-area'>
			<p className='title'>未完了のTODO</p>
			<ul>
				{todos.map((todo, index) => {
					return (
						<div key={todo} className='list-row'>
							<li>{todo}</li>
							<button onClick={() => onClickComplete(index)}>完了</button>
							{/* アロー関数で表示しないと常に削除の処理を走らせてしまう。 */}
							<button onClick={() => onClickDelete(index)}>削除</button>
						</div>
					);
				})}
			</ul>
		</div>
	);
};
