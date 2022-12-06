# Login by Metamask demo

## Install

```
yarn install
cp .env.example .env // pls change!
yarn dev
```

## Usage

1. Get a signature from your web3 app.

```javascript
const data = {publicAddress:"0xfd85b99a39a9f155b73b35d2b9ab224c3bed8ee5",username:"user1"}
fetch('http://127.0.01:8000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(res=>r.json()).then(json=>console.log(json))
// { nonce: 50571, id: 1, publicAddress: "0xfd85b99a39a9f155b73b35d2b9ab224c3bed8ee5", username: "user1" }
const msg = `I am signing my one-time nonce: 50571`;
web3.eth.personal.sign(msg, '0xfd85b99a39a9f155b73b35d2b9ab224c3bed8ee5', console.log);
// 0x9ea1c211f82de7ccfba83...
```

2. Get JWT token by auth

```javascript
fetch('http://127.0.01:8000/api/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    signature:"0x9ea1c211f82de7ccfba83...",publicAddress:"0xfd85b99a39a9f155b73b35d2b9ab224c3bed8ee5"}
  ),
}).then(res=>r.json()).then(json=>console.log(json))
// {
//    "accessToken": "eyJhbGciOiJIUzI1NiI...."
// }
```
