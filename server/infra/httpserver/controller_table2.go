package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table2Controller struct {
	app *app.Record2Handler
}

func NewTable2Ctrl() *Table2Controller {
	return &Table2Controller{
		app: app.NewRecord2Handler(),
	}
}

func (ctrl Table2Controller) Create(c *gin.Context) {
	var req = new(dto.CreateRecord2Req)

	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	_, err := ctrl.app.Create(c, getProjectID(c), req.Usecase, req.MainActor, req.SubActor, req.Des, req.Priority)
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}

func (ctrl Table2Controller) GetList(c *gin.Context) {
	list, err := ctrl.app.GetByPrj(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetListRecord2Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(list...)

	c.JSON(http.StatusOK, resp)
}
