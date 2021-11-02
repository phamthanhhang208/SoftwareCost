package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table3Controller struct {
	app *app.Table3Handler
}

func NewTable3Ctrl() *Table3Controller {
	return &Table3Controller{
		app: app.NewTable3Handler(),
	}
}

func (ctrl Table3Controller) Get(c *gin.Context) {
	table3, err := ctrl.app.GetByPrjID(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetTable3Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(table3)

	c.JSON(http.StatusOK, resp)
}

func (ctrl Table3Controller) Update(c *gin.Context) {
	var req = new(dto.UpdateTable3Req)

	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	var updateSpecs = make([]app.Table3UpdateSpec, 0, len(req.Records))
	for i := range req.Records {
		updateSpecs = append(updateSpecs, app.Table3UpdateSpec{
			Actor:       req.Records[i].Actor,
			Type:        req.Records[i].Type,
			Description: req.Records[i].Des,
			Note:        req.Records[i].Note,
		})
	}

	if err := ctrl.app.UpdateTable3(c, getProjectID(c), updateSpecs); err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}
