<script lang="ts">
	import { onMount } from "svelte";
	import { flip } from "svelte/animate";
	import { bounceOut, sineIn, sineOut } from "svelte/easing";
	import { scale } from "svelte/transition";
	import type { message } from "../lib/info";
	import Message from "../lib/message.svelte";
    // @ts-ignore
	import { PUBLIC_BASE, PUBLIC_SECURE } from "$env/static/public";

    let messages = [] as message[]

    onMount(async () => {
        const ws = new WebSocket(`ws${PUBLIC_SECURE == "false" ? "" : "s"}://${PUBLIC_BASE}/ws`)
        ws.onopen = function () {
            console.log("Opened!")
        }

        ws.onmessage = function (e) {
            const m = JSON.parse(e.data as string) as {event: string, data: unknown}
            console.log(m)
            switch (m.event) {
                case "PING":
                    ws.send("P")
                    return
                case "MESSAGES":
                    break
                case "MESSAGE":
                    const msg = m.data as message
                    
                    messages.push(msg)
                    messages = messages
                    break
            }
        }
    })
</script>

<div class="container">
    {#each messages as msg (msg.id)}
        <div class="message-wrapper" animate:flip={{
            duration: 450,
            easing: sineOut,
        }} transition:scale={{
            duration: 950,
            easing: bounceOut,
        }} >
            <div class="author">
                <p style="color: #{msg.author.color}">{msg.author.name}{msg.author.pronouns ? ` (${msg.author.pronouns})` : ""}</p>
            </div>
            <div class="message {msg.bits > 0 ? "cheer" : ""}" id={msg.id + "..." + msg.author.id}>
                {#if msg.reply}
                    <div class="reply" style="--c: #{msg.reply.author.color}">
                        <p>
                            <span style="color: #{msg.reply.author.color}" class="reply-author">{msg.reply.author.name}:</span>
                            <Message content={msg.reply.content} />
                        </p>
                    </div>
                {/if}
                <p>
                    <Message content={msg.content} />
                </p>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column; 
        align-items: center;
        overflow: hidden;
        justify-content: end;
        padding-bottom: 4vh;
    }

    $radius: 8px;
    $author-top-padding: 0.75vh;
    $author-side-padding: 2.25vw;
    $author-border: 4px;
    $message-border: 4px;
    $author-left: 2vw;
    $author-font-size: 1.55rem;
    $message-font-size: 1.7rem;
    $half-author-height: calc($author-top-padding + $author-border + $author-font-size/2);

    :root {
        --font-size: $message-font-size;
    }

    .reply {
        background: var(--gray-7);
        border: 2px solid var(--gray-6);
        padding: 0.75vh 0.75vw;
        margin-bottom: 1vh;
        border-radius: $radius;
    }

    .reply > p {
        font-size: 1rem;
        color: var(--blue-1);
    }

    .author {
        position: absolute;
        top: calc(0px - $half-author-height - $message-border);
        left: calc(0px - $author-left);
        padding: 0 5vw;
        min-width: 35%;
        padding: $author-top-padding $author-side-padding;
        background: var(--gray-7);
        border: $author-border solid var(--gray-6);
        border-radius: $radius;
    }

    p {
        text-align: start;
        word-break: break-word;
        white-space: break-spaces;
        color: var(--blue-2);
    }

    .author > p {
        font-size: $author-font-size;
    }

    .message > p {
        font-size: $message-font-size;
    }

    .message-wrapper {
        position: relative;
        width: calc(100% - $author-left - 4vw);
        margin-left: $author-left;
        margin-top: calc($half-author-height + 2vh);
        background: var(--gray-8);
        border: $message-border solid var(--gray-7);
        padding: calc($half-author-height + 1vh) 2vw 1.5vh;
        border-radius: $radius;
    }
</style>