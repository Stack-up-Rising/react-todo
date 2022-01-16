import React, { useState } from 'react';
import './style.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';

export const App = () => {
	// 入力した値を追加ボタンを押下した際、incompleteTodosのリストに追加する処理
	const [todoText, setTodoText] = useState('');

	// 未完了のTODOを格納する配列
	const [incompleteTodos, setIncompleteTodos] = useState([]);

	// 完了TODOのState化
	const [completeTodos, setCompleteTodos] = useState([]);

	// useStateの初期値が空文字なのでinputで変更があった際にStateも変更されるようにする処理。
	// 仕組みとしては、入力された値が入り、setTodoText関数に渡るというもの。
	// →onChangeTodoTextをJSX内のonChange属性に渡す。
	const onChangeTodoText = (event) => setTodoText(event.target.value);

	// 追加ボタンにonClickの処理を割り当てる。
	const onClickAdd = () => {
		// テキストボックスが空の状態で追加ボタンを押した際に処理を走らせないようにする。
		if (todoText === '') return;

		// 入力された値(todoText)を未完了のリスト(incompleteTodos)に追加する。
		// ※スプレッド構文を使用することで、入力された値があ未完了TODOリストへ追加される(結合される)。
		const newTodos = [...incompleteTodos, todoText];

		// 未完了TODOをセットする関数(setIncompleteTodos)に先程定義したnewTodosを渡す。
		setIncompleteTodos(newTodos);

		// 追加後にテキストボックス内に値が残らないように空文字でリセットする処理。
		setTodoText('');
	};

	// 削除ボタンを押下した際の処理
	const onClickDelete = (index) => {
		// 未完了TODO(incompleteTodos)から値を消すために新たに定数を定義
		const newTodos = [...incompleteTodos];

		// splice(配列要素を1つだけ削除)を使用し、リストから削除する。
		// 第一引数(何番目の要素か？)と第二引数(いくつ削除するか？)を渡す。
		newTodos.splice(index, 1);

		// 未完了TODOをセットする関数(setIncompleteTodos)に先程定義したnewTodosを更新。
		setIncompleteTodos(newTodos);
	};

	// 完了ボタンを押下した際の処理
	const onClickComplete = (index) => {
		// 完了ボタンを押すことで、未完了TODOから削除される。
		const newIncompleteTodos = [...incompleteTodos];
		newIncompleteTodos.splice(index, 1);

		// 新しい完了TODOは、すでに存在する完了TODOの後ろに押された行(未完了TODOのindex番目)を取ってきて
		// 新しい配列を生成する。
		const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

		//未完了TODOの関数を新たな未完了TODO(newIncompleteTodos)として更新。
		setIncompleteTodos(newIncompleteTodos);

		// 完了TODOを新たな完了TODO(newCompleteTodos)として更新。
		setCompleteTodos(newCompleteTodos);
	};

	// 戻すボタンを押下した際の処理
	const onClickBack = (index) => {
		// 戻すボタンを押すことで、完了TODOから削除される。
		const newCompleteTodos = [...completeTodos];
		newCompleteTodos.splice(index, 1);

		// 未完了TODOに追加(戻す)
		const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

		// 完了TODOを新たな完了TODO(newCompleteTodos)として更新。
		setCompleteTodos(newCompleteTodos);

		//未完了TODOの関数を新たな未完了TODO(newIncompleteTodos)として更新。
		setIncompleteTodos(newIncompleteTodos);
	};

	return (
		<>
			<InputTodo
				todoText={todoText}
				onChange={onChangeTodoText}
				onClick={onClickAdd}
			/>
			<IncompleteTodos
				todos={incompleteTodos}
				onClickComplete={onClickComplete}
				onClickDelete={onClickDelete}
			/>
			<CompleteTodos todo={completeTodos} onClickBack={onClickBack} />
		</>
	);
};
