export type author = {
    id: string,
    name: string,
    color: string,
    pronouns: string,
}

export type mdNode = {
    type:   "text" |
            "bold" |
            "ital" |
            "link" |
            "code" |
            "strike" |
            "emote"
} & ({
    content: string,
    children: undefined,
} | {
    content: undefined,
    children: mdNode[],
})

export type message = {
    id:      string,
    author:  author,
    content: mdNode[],
    time:    string,
    bits:    number,
    action:  boolean,
    reply?:  message,
}
