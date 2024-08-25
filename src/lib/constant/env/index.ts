const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? "";
const DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API ?? "";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY?.padEnd(32, "\0") ?? "";
const ALGORITHM = process.env.NEXT_PUBLIC_ALGORITHM ?? "";

export { DOMAIN_API, SECRET_KEY, ALGORITHM, DOMAIN };
