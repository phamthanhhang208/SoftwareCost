package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table4Controller struct {
	app *app.Table4Handler
}

func NewTable4Ctrl() *Table4Controller {
	return &Table4Controller{
		app: app.NewTable4Handler(),
	}
}

func (ctrl Table4Controller) Get(c *gin.Context) {
	table4, err := ctrl.app.GetByPrjID(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetTable4Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(table4)

	c.JSON(http.StatusOK, resp)
}

func (ctrl Table4Controller) Update(c *gin.Context) {
	var req = new(dto.UpdateTable4Req)

	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	updateSpec := app.UpdateTable4Spec{
		Project:  getProjectID(c),
		BSimple:  req.BSimple,
		BMedium:  req.BMedium,
		BComplex: req.BComplex,

		MSimple:  req.MSimple,
		MMedium:  req.MMedium,
		MComplex: req.MComplex,

		TSimple:  req.TSimple,
		TMedium:  req.TMedium,
		TComplex: req.TComplex,
	}
	if err := ctrl.app.Update(c, updateSpec); err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}
