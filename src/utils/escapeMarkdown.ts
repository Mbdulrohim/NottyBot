export const escapeMarkdown = (text: string): string => {
    const escapeChars = ['\\', '[', ']', '(', ')', '~', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];

    return text.replace(new RegExp(`([${escapeChars.join('\\')}])`, 'g'), '\\$1');
};
