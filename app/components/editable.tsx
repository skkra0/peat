import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

interface EditableProps {
	initial: string;
	placeholder?: string;
	className?: string;
	onBlur: (content: string) => void;
	clearOnBlur?: boolean;
}

const Editable = ({ initial, placeholder, className, onBlur, clearOnBlur }: EditableProps) => {
	const [content, setContent] = useState(initial);
    const contentRef = useRef(initial);

	useEffect(() => {
		setContent(initial);
	}, [initial]);

	useEffect(() => {
		contentRef.current = content;
	}, [content]);

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			(e.currentTarget as HTMLElement).blur();
		}
	}
	
	return (
		<ContentEditable
			className={classNames(className, "hover:italic focus:italic", "hover:border-blue-600", "border", "border-transparent", "cursor-text", "pr-2")}
			aria-placeholder={placeholder}
			onChange={(e) => setContent(e.currentTarget.innerHTML)}
			onBlur={(e) => {
				let newContent = contentRef.current;
				if (newContent !== "") {
					onBlur(newContent);
				}
				if (clearOnBlur) setContent("");
			}}
			onKeyDown={onKeyDown}
			html={content} />
	)
}

export default Editable;