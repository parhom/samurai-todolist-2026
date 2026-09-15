type ButtonProps = {
    title: string
	onClick?: () => void
	className?:string
};

export const Button = ({title, onClick, className}:ButtonProps) => {
	return (
		<button onClick={onClick} className={className}>
            {title}
		</button>
	);
};