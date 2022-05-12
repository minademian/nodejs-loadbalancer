# Requirements

## Functional
1. The load balancer shall balance requests in a round-robin fashion, from clients between the following video servers - `video1.case.nimbra.io`, `video2.case.nimbra.io`, and `video3.case.nimbra.io`.
1. The client shall send a JSON payload, containing a `channelId` property.
1. The video server responds to a forwarded request by the load balancer with a small JSON payload.
1. The video servers don't have to be real servers, they can be mocked or faked.
1. The load balancer shall listen to client requests on a resource named `/allocateStream`.
1. The load balancer shall remove the `secret` property from the video server's payload and return it to the requesting client.

## Non-functional
1. If the video server responds with a 500 error code, the load balancer shall poll the next video server available.
1. If the load balancer has not received a response within 1 second, it shall poll the next available video server.
1. If all video servers respond with 500 or fail to respond, the load balancer shall return a 500 code to the client.
