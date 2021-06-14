import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export interface TimeoutIconProps {
	duration: number;
	className?: string;
	onTimeout?: () => void;
}

export const TimeoutIcon = ({
	duration,
	onTimeout,
	className,
}: TimeoutIconProps) => {
	const [value, setValue] = useState(100);
	const [startTimestamp] = useState(new Date().valueOf());

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTimestamp = new Date().valueOf();
			const difference = currentTimestamp - startTimestamp;
			const percentage = 100 - (difference / duration) * 100;
			if (percentage >= 0) {
				setValue(percentage);
			} else {
				onTimeout && onTimeout();
			}
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, [startTimestamp, duration, onTimeout]);

	return (
		<div className={className}>
			<CircularProgressbar
				value={value}
				strokeWidth={50}
				background={false}
				styles={buildStyles({
					strokeLinecap: "butt",
					trailColor: "none",
					pathColor: "rgba(255, 255, 255, 0.6)",
					pathTransitionDuration: 0.1,
				})}
			/>
		</div>
	);
};
