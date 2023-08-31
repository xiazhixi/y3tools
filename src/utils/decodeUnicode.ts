export default function decodeUnicode(str: string) {
    return str.replace(/\\u([\dA-Fa-f]{4})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    });
}
