package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/phamthanhhang208/SoftwareCost/server/config"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver"
)

func main() {
	if err := config.Set("config.yml"); err != nil {
		panic(err)
	}

	if err := gormdb.InitConnection(config.Get().DB.DSN(), config.Get().DB.LogLevel, config.Get().DB.LogColor); err != nil {
		panic(err)
	}

	start, stop := httpserver.Start(config.Get().HTTP)
	go func() {
		if err := start(); err != nil {
			panic(err)
		}
	}()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGQUIT, syscall.SIGTERM)
	select {
	case <-sigChan:
	}

	stop()
}
