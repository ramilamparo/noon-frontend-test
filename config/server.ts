if (typeof window !== "undefined") {
	throw new Error("Do not expose these secrets in the BROWSER!!!");
}

const { SECRET } = process.env;

if (!SECRET) {
	throw new Error("SECRET is undefined");
}

export const secret = SECRET;
