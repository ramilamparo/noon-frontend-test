import ReactDOM from "react-dom";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "store/state";
import { AppDispatch } from "store/actions/types";
import { Alert } from "store/actions/Alert";
import { Snackbar } from "@presentational/Snackbar/Snackbar";

const SnackbarContainer = styled.div`
	position: fixed;
	right: 0;
	bottom: 0;
	z-index: 100;
	padding: 1rem;

	& > *:not(:last-child) {
		margin-bottom: 0.5rem;
	}
`;

const modalRoot = document.body;

export const SnackbarPortal = () => {
	const snackbarContainerElementRef = useRef(document.createElement("div"));

	const alerts = useSelector(({ alerts }: StoreState) => alerts);

	const dispatch = useDispatch<AppDispatch>();

	const handleDismiss = useCallback(
		(id: string) => () => {
			const action = Alert.dismiss(id);
			dispatch(action);
		},
		[dispatch]
	);

	const snackbars = useMemo((): ReactNode[] => {
		return alerts.map((alert) => (
			<Snackbar
				key={alert.id}
				message={alert.message}
				onDismiss={handleDismiss(alert.id)}
				type={alert.type}
				expiry={alert.expiry}
			/>
		));
	}, [alerts, handleDismiss]);

	useEffect(() => {
		const snackbarContainerElement = snackbarContainerElementRef.current;
		modalRoot.appendChild(snackbarContainerElement);
		return () => {
			modalRoot.removeChild(snackbarContainerElement);
		};
	}, []);

	return ReactDOM.createPortal(
		<SnackbarContainer>{snackbars}</SnackbarContainer>,
		snackbarContainerElementRef.current
	);
};
