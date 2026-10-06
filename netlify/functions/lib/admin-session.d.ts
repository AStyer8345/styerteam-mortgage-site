export function equal(a: unknown, b: unknown): boolean;
export function issueSession(now?: number): string;
export function validSession(headers?: Record<string,string>, now?: number): boolean;
export function sameOrigin(event: {headers:Record<string,string>;rawUrl:string;httpMethod:string}): boolean;
export function sessionAuthorization(event: {headers:Record<string,string>;rawUrl:string;httpMethod:string}): boolean;
export function cookieHeader(token:string): string;
