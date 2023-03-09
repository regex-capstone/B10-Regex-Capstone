const escapedChars: any = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
}

export function escapeHTML(str: string): string {
    return str.replace(/[&<>'"]/g, tag => (escapedChars[tag]));
}

// export const arrEscapeHTML = arr => arr.map(token => token.replace(/[&<>'"]/g, 
//     tag => ({
//         '&': '&amp;',
//         '<': '&lt;',
//         '>': '&gt;',
//         "'": '&#39;',
//         '"': '&quot;'
//     }[tag])));