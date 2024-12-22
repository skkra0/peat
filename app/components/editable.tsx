import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
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
		} else if (e.ctrlKey || e.metaKey) {
			if (e.key === "b" || e.key === "i") {
				e.preventDefault();
				document.execCommand(e.key === "b" ? "bold" : "italic");
				console.log(e.key);
			}
		}
	}
	
	const onChange = useCallback((e: ContentEditableEvent) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "em", "strong", "a"],
			allowedAttributes: { "a": ["href"] },
			disallowedTagMode: "discard",
		}

		let sanitized = sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf);
		sanitized = sanitized.replace(/^\s+|\s+$/g, "&nbsp;");
		setContent(sanitized);
	}, []);
	return (
		<ContentEditable
			className={classNames(className, "hover:border-blue-600 focus:outline-blue-600", "border", "border-transparent", "cursor-text", "pr-2")}
			aria-placeholder={placeholder}
			onChange={onChange}
			onBlur={() => {
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