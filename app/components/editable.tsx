import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

interface EditableProps {
	initial: string;
	placeholder: string;
	className?: string;
	onBlur: (content: string) => void;
	clearOnBlur?: boolean;
}

const Editable = ({ initial, placeholder, className, onBlur, clearOnBlur }: EditableProps) => {
	const [content, setContent] = useState(initial);
    const contentRef = useRef(initial);

	const onChange = useCallback((e: { currentTarget : { innerHTML: string } }) => {
		const sanitizeConf = {
			allowedTags: [],
			allowedAttributes: {},
			disallowedTagMode: 'discard',
		};

		const sanitized = sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf).trim();
		setContent(sanitized);
	}, []);

	const onContentBlur = useCallback(() => {
		let newContent = contentRef.current.replace(/<br>/g, "").replace(/&nbsp;/g, " ").trim();
		if (newContent !== "") {
			console.log(newContent);
			onBlur(newContent);
		}
		if (clearOnBlur) setContent("");
	}, [onBlur, clearOnBlur]);

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
			onChange={onChange}
			onBlur={(e) => onContentBlur()}
			onKeyDown={onKeyDown}
			html={content} />
	)
}

export default Editable;