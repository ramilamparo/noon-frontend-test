export class UnauthorizedException extends Error {
	constructor() {
		super("You need to login first!");
	}
}
