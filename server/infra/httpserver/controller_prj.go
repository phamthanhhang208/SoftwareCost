package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type PrjController struct {
	app *app.ProjectHandler
}

func NewPrjCtrl() *PrjController {
	return &PrjController{
		app: app.NewProjectHandler(),
	}
}

func (ctrl PrjController) CreateProject(c *gin.Context) {
	var req = new(dto.CreateProjectReq)

	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	prj, err := ctrl.app.CreateProject(c, req.Name)
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.CreateProjectResp)
	resp.SetCode(http.StatusOK)
	resp.SetData(prj.UUID)

	c.JSON(http.StatusOK, resp)
}
