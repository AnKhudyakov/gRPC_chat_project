proto-c:
	protoc -I=. ./proto/*.proto \
	--js_out=import_style=commonjs:../../frontend/src/proto \
	--grpc-web_out=import_style=commonjs,mode=grpcwebtext:../../frontend/src/proto 

proto-loader-gen-types:
	npm proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto
	
docker:
	docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \
    -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.22.0
protoc-gen-grpc-web: 
	protoc proto/*.proto --plugin=protoc-gen-grpc-web="$pwd`\node_modules\.bin\protoc-gen-grpc-web.cmd" --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../../frontend/src
protoc-gen-js:
	protoc --proto_path=. proto/*.proto --js_out=import_style=commonjs:../../frontend/src