import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

interface EditableProps {
	initial: string;
	placeholder: string;
	className?: string;
	onBlur: (content: string) => void;
}

const Editable = ({ initial, placeholder, className, onBlur }: EditableProps) => {
	const [content, setContent] = useState(initial);
    const contentRef = useRef(initial);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			(e.currentTarget as HTMLElement).blur();
		}
	}
	useEffect(() => {
		contentRef.current = content;
	}, [content]);
	
	return (
		<ContentEditable
			className={className}
			aria-placeholder={placeholder}
			onChange={(e) => setContent(e.target.value)}
			onBlur={(e) => onBlur(contentRef.current)}
			onKeyDown={onKeyDown}
			html={content} />
	)
}

export default Editable;