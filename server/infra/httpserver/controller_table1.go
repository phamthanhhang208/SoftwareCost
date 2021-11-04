package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table1Controller struct {
	app *app.Record1Handler
}

func NewTable1Ctrl() *Table1Controller {
	return &Table1Controller{
		app: app.NewRecord1Handler(),
	}
}

func (ctrl Table1Controller) CreateRecord1(c *gin.Context) {
	var req = new(dto.CreateRecord1Req)

	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	_, err := ctrl.app.CreateRecord1(c, getProjectID(c), req.Description, req.Type, req.Note)
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}

func (ctrl Table1Controller) GetList(c *gin.Context) {
	list, err := ctrl.app.GetByPrj(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetListRecord1Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(list...)

	c.JSON(http.StatusOK, resp)
}
