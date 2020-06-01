export const checker = value => !!value

export const trim = str => (str ? str.replace(/(^\s*)|(\s*$)/g, '') : '');