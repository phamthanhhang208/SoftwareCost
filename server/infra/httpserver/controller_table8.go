package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table8Controller struct {
	app *app.Table8Handler
}

func NewTable8Ctrl() *Table8Controller {
	return &Table8Controller{
		app: app.NewTable8Handler(),
	}
}

func (ctrl Table8Controller) Get(c *gin.Context) {
	table8, err := ctrl.app.Get(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetTable8Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(table8)

	c.JSON(http.StatusOK, resp)
}

func (ctrl Table8Controller) GetTable9(c *gin.Context) {
	table8, err := ctrl.app.Get(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetTable9Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(table8)

	c.JSON(http.StatusOK, resp)
}

func (ctrl Table8Controller) Update(c *gin.Context) {
	var req = new(dto.UpdateTable8Req)
	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	if err := ctrl.app.Update(c, getProjectID(c), req.H); err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}
