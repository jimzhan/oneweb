// URL-friendly Session Key (size: 36 ~ 128).
export const session = /^[A-Za-z0-9_-]{36,128}$/

// https://github.com/ranisalt/node-argon2/wiki/Options
export const argon2 = /^\$argon2id\$v=(?:16|19)\$m=\d{1,10},t=\d{1,10},p=\d{1,3}(?:,keyid=[A-Za-z0-9+/]{0,11}(?:,data=[A-Za-z0-9+/]{0,43})?)?\$[A-Za-z0-9+/]{11,64}\$[A-Za-z0-9+/]{16,86}$/
