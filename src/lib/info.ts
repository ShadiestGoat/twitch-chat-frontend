export type author = {
    id: string,
    name: string,
    color: string,
    pronouns: string,
}

export type emote = {
    url: string,
    /** [start, end], end is non inclusive. These are indexes */
    positions: [number, number][]
}

export type message = {
    id:      string,
    author:  author,
    content: string,
    time:    string,
    emotes:  emote[],
    bits:    number,
    action:  boolean,
    reply?:  message,
}
