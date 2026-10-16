import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanProps = {
    value: string
	onChange: (title:string)=>void
};

export const EditableSpan = ({value, onChange}:EditableSpanProps) => {
	const [isEditMode, setIsEdeitMode] = useState(false)
	const [title, setTitle] = useState(value)
	
	const turnOnEditMode = () =>{
		setIsEdeitMode(true)
	}
	
	const turnOffEditMode = () =>{
		setIsEdeitMode(false)
		onChange(title)
	}
	
	const changTitle = (e:ChangeEvent<HTMLInputElement> ) => {
		setTitle(e.currentTarget.value)
	}
	
	return (
		<>
		{ isEditMode ?
			(<TextField value={title} onBlur={turnOffEditMode} onChange={changTitle} variant={'standard'} autoFocus/>) :
			(<span onDoubleClick={turnOnEditMode}>{value}</span>)
		}
		</>
	);
};