const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

if (!apiEndpoint) {
	throw new Error(`NEXT_PUBLIC_API_ENDPOINT is required.`);
}

export { apiEndpoint };
