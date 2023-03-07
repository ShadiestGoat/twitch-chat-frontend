# Twitch Chat Relay Frontend

This is my customized twitch chat relay. This is a frontend for the [backend project](https://github.com/ShadiestGoat/twitch-chat-backend).

## Configuration

Like the backend, this is also edited using a `.env`. This is made using the node adapter, check out [their documentation for project config](https://kit.svelte.dev/docs/adapter-node#environment-variables-port-and-host). The most important one is `PORT`, which will change where the app is hosted on. 

I added the following options to configure this:

| env var | explanation | example |
|---------|-------------|---------|
| PUBLIC_BASE | the base location for the backend. Do not include protocols like http or https. Do not include trailing slashes. | `shadygoat.eu`,`shadygoat.eu/api`
| PUBLIC_SECURE | If this is set to `false`, the API will use the `ws` interface, not `wss`. This is not recommended. | `true`, `asdkl` (this is unknown, will default to `true`), `false` |

> Please note, you must rebuild the app after changes in configuration!

## Usage/Building/Running

To run this, first clone the repository (`git clone` or download the source code). Then:

1. Navigate to the folder that this code is in
2. Run `npm ci -D`
3. Edit your `.env` file
4. Run `npm run build` (this will create a directory called 'build')
5. Run `npm run prod` (this will launch the app)