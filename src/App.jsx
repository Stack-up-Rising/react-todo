import React, { useState } from 'react';
import './style.css';

export const App = () => {
	// 入力した値を追加ボタンを押下した際、incompleteTodosのリストに追加する処理
	const [todoText, setTodoText] = useState('');

	// 未完了のTODOを格納する配列
	const [incompleteTodos, setIncompleteTodos] = useState([
		'ああああ',
		'いいいい',
	]);

	// 完了TODOのState化
	const [completeTodos, setCompleteTodos] = useState(['うううう']);

	// useStateの初期値が空文字なのでinputで変更があった際にStateも変更されるようにする処理。
	// 仕組みとしては、入力された値が入り、setTodoText関数に渡るというもの。
	// →onChangeTodoTextをJSX内のonChange属性に渡す。
	const onChangeTodoText = (event) => setTodoText(event.target.value);

	// 追加ボタンにonClickの処理を割り当てる。
	const onClickAdd = () => {
		if (todoText === '') return;

		// 入力された値(todoText)を未完了のリスト(incompleteTodos)に追加する。
		// ※スプレッド構文を使用することで、入力された値があ未完了TODOリストへ追加される(結合される)。
		const newTodos = [...incompleteTodos, todoText];

		// 未完了TODOをセットする関数(setIncompleteTodos)に先程定義したnewTodosを渡す。
		setIncompleteTodos(newTodos);

		// 追加後にテキストボックス内に値が残らないように空文字でリセットする処理。
		setTodoText('');
	};

	return (
		<>
			<div className='input-area'>
				<input
					placeholder='TODOを入力'
					value={todoText}
					onChange={onChangeTodoText}
				/>
				<button onClick={onClickAdd}>追加</button>
			</div>
			<div className='incomplete-area'>
				<p className='title'>未完了のTODO</p>
				<ul>
					{incompleteTodos.map((todo) => {
						return (
							<div key={todo} className='list-row'>
								<li>{todo}</li>
								<button>完了</button>
								<button>削除</button>
							</div>
						);
					})}
				</ul>
			</div>
			<div className='complete-area'>
				<p className='title'>完了のTODO</p>
				<ul>
					{completeTodos.map((todo) => {
						return (
							<div key={todo} className='list-row'>
								<li>{todo}</li>
								<button>戻す</button>
							</div>
						);
					})}
				</ul>
			</div>
		</>
	);
};
