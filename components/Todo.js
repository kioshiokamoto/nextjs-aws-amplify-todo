import { useState } from 'react';
import { API } from 'aws-amplify';
import { updateTodo as UpdateTodo } from '../src/graphql/mutations';
import { deleteTodo as DeleteTodo } from '../src/graphql/mutations';

const Todo = ({ completed, name, description, className, id, editing, onClickDelete }) => {
	const [finished, setFinished] = useState(completed);
	const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

	const updateTodoCompleted = async (id) => {
		try {
			await API.graphql({
				query: UpdateTodo,
				variables: {
					input: { id: id, completed: !finished },
				},
			});
		} catch (err) {
			console.log('error: ', err);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await API.graphql({
				query: DeleteTodo,
				variables: { input: { id } },
			});
		} catch (err) {
			console.log({ err });
		}
	};

	return (
		<div className={className}>
			<div className="mx-4 my-auto">
				{finished ? (
					<button
						onClick={() => {
							setFinished(false);
							updateTodoCompleted(id);
						}}
						className="focus:outline-none"
					>
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="15" cy="15" r="13" fill="#FAFAFA" stroke="#26a69a" strokeWidth="4" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M21.6947 10.2928C21.8822 10.4803 21.9875 10.7346 21.9875 10.9998C21.9875 11.265 21.8822 11.5193 21.6947 11.7068L13.6947 19.7068C13.5072 19.8943 13.2529 19.9996 12.9877 19.9996C12.7225 19.9996 12.4682 19.8943 12.2807 19.7068L8.28071 15.7068C8.09855 15.5182 7.99776 15.2656 8.00004 15.0034C8.00232 14.7412 8.10749 14.4904 8.29289 14.305C8.4783 14.1196 8.72911 14.0144 8.99131 14.0121C9.25351 14.0098 9.50611 14.1106 9.69471 14.2928L12.9877 17.5858L20.2807 10.2928C20.4682 10.1053 20.7225 10 20.9877 10C21.2529 10 21.5072 10.1053 21.6947 10.2928Z"
								fill="#61A0FF"
							/>
						</svg>
					</button>
				) : (
					<button
						onClick={() => {
							setFinished(true);
							updateTodoCompleted(id);
						}}
						className="focus:outline-none"
					>
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="15" cy="15" r="13" fill="#FAFAFA" stroke="#26a69a" strokeWidth="4" />
						</svg>
					</button>
				)}
			</div>
			<div className="flex justify-between w-full my-auto mr-6">
				<div className="flex flex-col">
					<div className={`text-lg text-gray-700  ${finished && 'line-through'}`}>{name}</div>
					<div className={`text-sm text-gray-700 ${finished && 'line-through'}`}>{description}</div>
				</div>

				{editing ? (
					<button
						className="flex-end focus:outline-none"
						onClick={() => {
							setDeleteButtonClicked(true);
						}}
					>
						<svg
							className="w-8 h-8 text-pink-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
					</button>
				) : null}
				{deleteButtonClicked ? (
					<div
						className="fixed inset-0 z-10 overflow-y-auto"
						aria-labelledby="modal-title"
						role="dialog"
						aria-modal="true"
					>
						<div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
							<div
								className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
								aria-hidden="true"
							></div>

							<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
								&#8203;
							</span>

							<div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
								<div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
									<div className="sm:flex">
										<div className="w-full mt-3 text-center sm:mt-0 sm:mx-2 sm:text-left">
											<h3
												className="text-lg font-medium leading-6 text-gray-900"
												id="modal-title"
											>
												Eliminar Todo
											</h3>
											<h3
												className="text-sm font-medium leading-6 text-gray-700"
												id="modal-title"
											>
												¿Estás segura(o) de que quieres eliminar este TODO?
											</h3>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse focus:outline-none">
									<button
										type="button"
										onClick={() => {
											onClickDelete();
											setDeleteButtonClicked(false);
										}}
										className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-400 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
									>
										Eliminar
									</button>
									<button
										type="button"
										onClick={() => {
											setDeleteButtonClicked(false);
										}}
										className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									>
										Cancelar
									</button>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Todo;
