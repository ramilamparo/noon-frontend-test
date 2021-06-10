import ReactDOM from "react-dom";
import { ReactNode, useEffect, useState } from "react";

export interface BodyPortalProps {
	children: ReactNode;
}

export const BodyPortal = ({ children }: BodyPortalProps) => {
	const [container, setContainer] = useState<HTMLDivElement | null>(null);

	useEffect(() => {
		if (document) {
			setContainer(document.createElement("div"));
		}
	}, []);

	useEffect(() => {
		const containerCopy = container;
		if (containerCopy) {
			document.body.appendChild(containerCopy);
			return () => {
				document.body.removeChild(containerCopy);
			};
		}
	}, [container]);

	if (container) {
		return ReactDOM.createPortal(children, container);
	}

	return null;
};
