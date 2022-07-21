/* eslint-disable no-await-in-loop,no-restricted-syntax */

/**
 * Creates an iterable from a {@link ReadableStream}.
 * @param stream A {@link ReadableStream} to parse
 */
const streamToIterator = (stream: ReadableStream) => (async function* iter() {
    const reader = stream.getReader();
    while (1) {
        const chunk = await reader.read();
        if (chunk.done) return chunk.value;
        yield chunk.value;
    }
}());

/**
 * Fulfills with the contents of the stream parsed as a UTF-8 encoded string.
 * @param stream A {@link ReadableStream} to parse
 */
export async function text(stream: ReadableStream) {
    let str = '';
    const textDecoder = new TextDecoder();
    for await (const chunk of streamToIterator(stream)) {
        str += textDecoder.decode(chunk, { stream: true });
    }
    str += textDecoder.decode(); // flush
    return str;
}

/**
 * Fulfills with the contents of the stream parsed as a UTF-8
 * encoded string that is then passed through JSON.parse().
 * @param stream A {@link ReadableStream} to parse
 */
export function json(stream: ReadableStream) {
    return text(stream).then(JSON.parse);
}
