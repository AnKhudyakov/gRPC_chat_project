# Welcome to gRPC_chat_project

### `Installing`
Things you need to run this application

1. Node npm
2. Docker
3. protoc (version 3.20.x important! version 3.21.x not work, see [issue](https://github.com/protocolbuffers/protobuf-javascript/issues/127)


### `Run the project`

All the commands need to run in root directory.

1. Run node server:
```sh
$ cd backend/server && npm i && npm start
```
2. Run proxy envoy:
```sh
$ docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.22.0
```
3. Run server for web-client
```sh
cd frontend && npm i && npm start
```
