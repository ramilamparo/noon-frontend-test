import config from "knexfile";

export const secret = process.env.SECRET || "Default_Secret!";
export const knexConfig = config[process.env.NODE_ENV];
