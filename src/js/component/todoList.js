import React, { useState, useEffect } from "react";

export function ToDoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/shmaither", {
			method: "POST", // or 'PUT'
			body: JSON.stringify([]), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						console.log("respuesta", resp);
						return resp.json();
					})
					.then(data => setList(data))

					.catch(err => {
						console.log("error", err);
					});
			})

			.catch(err => {
				console.log("error", err);
			});
	}, []);

	const addTask = e => {
		if (e.key === "Enter" && inputValue !== "") {
			let newObject = { label: inputValue, done: false };
			let newList = list.concat(newObject);
			//setList([...list, newObject]);
			setInputValue("");
			console.log("Objects in list, when addTask: ", newList);

			console.log("List extension: ", newList.length);
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newList)
				}
			)
				.then(resp => {
					console.log("Respuesta de PUT from addTask", resp);
					setList(newList);
				})
				.catch(error => {
					console.log("Error PUT", error);
				});
		}
	};

	const deleteTask = listIndex => {
		let tempList = [...list];
		console.log("tempList inside deleteTask: ", tempList);
		let updateList = tempList.filter(
			//underscore indicates the first parameter is not being used
			(_task, taskIndex) => taskIndex != listIndex
		);
		console.log("upadateList inside deleteTask: ", updateList);

		const methods = ["PUT", "DELETE"];

		if (updateList.length > 0) {
			console.log("List extension: ", updateList.length);
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updateList)
				}
			)
				.then(resp => {
					console.log("Respuesta de PUT", resp);
					setList(updateList);
					console.log("List from useState inside deleteTask: ", list);
				})
				.catch(error => {
					console.log("Error PUT", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/shmaither",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updateList)
				}
			)
				.then(resp => {
					console.log("Respuesta de DELETE", resp);
					setList(updateList);
					console.log(list);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		}
	};

	const deleteAll = () => {
		let emptyList = [];

		fetch("https://assets.breatheco.de/apis/fake/todos/user/shmaither", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(emptyList)
		})
			.then(resp => {
				console.log("Respuesta de DELETE inside deleteAll", resp);
				setList(emptyList);
			})
			.catch(error => {
				console.log("Error delete", error);
			});
	};

	return (
		<div className="container pt-3">
			<h1 className="text-center display-3">todos</h1>
			<card>
				<input
					type="text"
					className="form-control"
					onChange={e => setInputValue(e.target.value)}
					onKeyUp={addTask}
					value={inputValue}
					placeholder="Add a task here . . ."
				/>
				<div>
					<ul className="list-group list-group-flush">
						{list.map((task, listIndex) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between"
									key={listIndex}>
									{task.label}
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
							onClick={() => deleteAll()}>
							Delete All
						</button>
					</div>
				</div>
			</card>
		</div>
	);
}
