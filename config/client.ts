const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getEnv = () => {
	if (!apiEndpoint) {
		throw new Error(`NEXT_PUBLIC_API_ENDPOINT is required.`);
	}
	return { apiEndpoint };
};
