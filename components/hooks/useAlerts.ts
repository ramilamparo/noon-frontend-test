import { Alert, CreateAlertInput } from "store/actions/Alert";
import { AppDispatch } from "store/actions/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useAlerts = () => {
	const dispatch = useDispatch<AppDispatch>();

	const createAlert = useCallback(
		(alert: CreateAlertInput) => {
			const action = Alert.create(alert);
			dispatch(action);
			return action.payload.id;
		},
		[dispatch]
	);

	const dismissAlert = useCallback(
		(id: string) => {
			dispatch(Alert.dismiss(id));
		},
		[dispatch]
	);

	return { createAlert, dismissAlert };
};
