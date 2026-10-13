import {ChangeEvent, useState} from "react";

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
			(<input value={title} onBlur={turnOffEditMode} onChange={changTitle} autoFocus/>) :
			(<span onDoubleClick={turnOnEditMode}>{value}</span>)
		}
		</>
	);
};