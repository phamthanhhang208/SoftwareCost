package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table5Controller struct {
	app *app.Table5Handler
}

func NewTable5Ctrl() *Table5Controller {
	return &Table5Controller{
		app: app.NewTable5Handler(),
	}
}

func (ctrl Table5Controller) Get(c *gin.Context) {
	table5, err := ctrl.app.Get(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetTable5Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(table5)

	c.JSON(http.StatusOK, resp)
}
