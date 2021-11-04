# ----------------------------------------------------------
# Build layer
FROM golang:1.17-alpine3.14 AS builder

# set ENV variables
ENV GO111MODULE=on \
    GOOS=linux \
    GOARCH=amd64

# Build directory
WORKDIR /build

# go mod download for better layer cache
COPY ["./", "./"]

RUN go mod tidy

# build app
RUN go build -v -o server

# ----------------------------------------------------------
# Run layer
FROM alpine

WORKDIR /

COPY --from=builder ["/build/server", "server"]
COPY --from=builder ["/build/config.yml", "config.yml"]

EXPOSE 11000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

CMD /wait && /server