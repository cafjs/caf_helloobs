# Caf.js

Co-design permanent, active, stateful, reliable cloud proxies with your web app and devices.

See https://www.cafjs.com

## HelloOBS

Controls OBS (Open Broadcaster Software) remotely and securely with a Cloud Assistant.

Change the scene, select a different camera, all with a (remote) web browser.

OBS already exposes control commands with a local websocket, we just need to run bridging code in a local browser, which tunnels authenticated requests from a cloud assistant. Requests that can come from a remote web browser, or other cloud services.

This example shows that Reverse Service Workers (RSWs) are not only useful for physical devices, but also to interact with other services and applications that can be off-line.

Even if the OBS instance is off-line, we can still configure it!
