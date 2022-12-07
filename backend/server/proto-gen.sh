#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto

protoc -I=. ./proto/*.proto \
	--js_out=import_style=commonjs:../../frontend/src \
	--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../../frontend/src