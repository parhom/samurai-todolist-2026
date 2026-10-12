import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type CreateItemFormProps = {
	onCreateItem: (title:string) =>void
};

export const CreateItemForm = ({onCreateItem} :CreateItemFormProps) => {
	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	
	const changeItemTitleHandler  = (event:ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
		setError(null)
	}
	
	const createItemHandler  = () =>{
		const trimmedTitle =  title.trim()
		if (trimmedTitle !== '') {
			onCreateItem(trimmedTitle)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}
	
	const createItemOnEnterHandler  = (event:KeyboardEvent<HTMLInputElement>) =>{
		if (event.key === 'Enter') {
			createItemHandler()
		}
	}
	
	return (
		<div>
			<input value={title}
			       onChange={changeItemTitleHandler}
			       onKeyDown={createItemOnEnterHandler}
			       className={error ? 'error' : ''}
			/>
			<Button title={"+"} onClick={createItemHandler}/>
			{error && <div className={'error-message'}>{error}</div>}
		</div>
	);
};