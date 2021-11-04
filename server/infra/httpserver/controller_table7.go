package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

type Table7Controller struct {
	app *app.Table7Handler
}

func NewTable7Controller() *Table7Controller {
	return &Table7Controller{
		app: app.NewTable7Handler(),
	}
}

func (ctrl Table7Controller) Get(c *gin.Context) {
	table7, err := ctrl.app.GetTable7(c, getProjectID(c))
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	resp := new(dto.GetTable7Resp)
	resp.SetCode(http.StatusOK)
	resp.SetData(table7)

	c.JSON(http.StatusOK, resp)
}

func (ctrl Table7Controller) CreateEmployee(c *gin.Context) {
	var req = new(dto.CreateRecord7EmployeeReq)
	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	_, err := ctrl.app.CreateEmployee(c, getProjectID(c), req.RUPRank, req.SimilarRank, req.OOPRank, req.LeaderRank, req.ActiveRank)
	if err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}

func (ctrl Table7Controller) UpdateProject(c *gin.Context) {
	var req = new(dto.UpdateRecord7ProjectReq)
	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	if err := ctrl.app.UpdateProject(c, getProjectID(c), req.RequestStableRank, req.PartTimeRank, req.HardLanguageRank); err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}
