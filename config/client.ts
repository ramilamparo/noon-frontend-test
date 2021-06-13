const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getEnv = () => {
	if (!apiEndpoint) {
		console.error(`NEXT_PUBLIC_API_ENDPOINT is required.`);
	}
	return { apiEndpoint };
};
