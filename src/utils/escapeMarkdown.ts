// escapeMarkdown.ts

export const escapeMarkdown = (text: string): string => {
    const escapeChars = ['\\', '*', '_', '{', '}', '(', ')', '[', ']', '#', '+', '-', '.', '!', '`'];
    
    // Iterate over each special character and escape it with a backslash
    let escapedText = text;
    escapeChars.forEach(char => {
      const re = new RegExp(`\\${char}`, 'g');
      escapedText = escapedText.replace(re, `\\${char}`);
    });
    
    return escapedText;
  };
  