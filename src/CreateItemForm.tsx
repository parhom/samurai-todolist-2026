import {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

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
			<TextField value={title}
			           label={'Enter a title'}
			           onChange={changeItemTitleHandler}
			           onKeyDown={createItemOnEnterHandler}
			           error={!!error}
			           variant={'standard'}
			           helperText={error}
			/>
			<IconButton onClick={createItemHandler} size={"small"} color={'primary'}>
				<AddBoxIcon/>
			</IconButton>
		</div>
	);
};