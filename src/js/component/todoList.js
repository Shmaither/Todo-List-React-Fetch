import React, { useState, useEffect } from "react";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const addTask = e => {
		if (e.key === "Enter" && inputValue != "") {
			setList(list => [...list, inputValue]);
			setInputValue("");
		}
		/*
		fetch("https://assets.breatheco.de/apis/fake/todos/user/shmaither", {
			method: "PUT", // or 'PUT'
			body: JSON.stringify(list), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
        */
	};

	const deleteTask = listIndex => {
		let updateList = list.filter(
			//underscore indicates the first parameter is not being used
			(_task, taskIndex) => taskIndex != listIndex
		);
		setList(updateList);
	};

	const deleteAll = () => {
		setList([]);
	};
	/*
	useEffect(() => {
		sync();
	}, []);

	const sync = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/shmaither", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				setList(myJson);
			});
	};
    */
	return (
		<div className="container pt-3">
			<h1 className="text-center display-3">todos</h1>
			<card>
				<input
					type="text"
					className="form-control"
					onChange={e => setInputValue(e.target.value)}
					value={inputValue}
					onKeyUp={addTask}
					placeholder="Add a task here . . ."
				/>
				<div>
					<ul className="list-group list-group-flush">
						{list.map((task, listIndex) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between"
									key={listIndex}>
									{task}
									<span onClick={() => deleteTask(listIndex)}>
										<i className="fas fa-times"></i>
									</span>
								</li>
							);
						})}
					</ul>
					<div className="card-footer bg-transparent d-flex justify-content-end pr-0">
						<p className="card-text pr-4">
							<small className="text-muted ">
								{list.length === 0
									? "(No pending tasks)"
									: list.length === 1 // if else with ternary operator
									? list.length + " task left"
									: list.length + " tasks left"}
							</small>
						</p>
						<button
							type="button"
							className="btn btn-outline-secondary btn-sm mr-2"
							onClick={deleteAll}>
							Delete All
						</button>
						<button
							type="button"
							className="btn btn-outline-success btn-sm">
							<i className="fas fa-redo"></i>
						</button>
					</div>
				</div>
			</card>
		</div>
	);
}
