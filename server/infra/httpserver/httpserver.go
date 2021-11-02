package httpserver

import (
	"fmt"
	"net/http"

	"github.com/phamthanhhang208/SoftwareCost/server/config"
)

func Start(cfg config.HTTPServerConfig) (func() error, func()) {
	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%s", cfg.Host, cfg.Port),
		Handler: NewRouter(),
	}

	start := func() error {
		return server.ListenAndServe()
	}

	stop := func() {
		server.Close()
	}

	return start, stop
}
