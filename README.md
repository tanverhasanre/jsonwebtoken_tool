# This repo is created only for experimential reason. 

# jswonwebtoken_tool

An implementation of rfc7519

# Install

```bash
$ npm install jsonwebtoken_tool
```

# Usage

### jwt.sign(payload, secretOrPrivateKey, [options, callback])


(Asynchronous) If a callback is supplied, the callback is called with the `err` or the JWT.

(Synchronous) Returns the JsonWebToken as string

### jwt.verify(token, secretOrPublicKey, [options, callback])

(Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

(Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.


### jwt.decode(token [, options])
(Synchronous) Returns the decoded payload without verifying if the signature is valid.