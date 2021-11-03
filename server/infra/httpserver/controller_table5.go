package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/app"
	"github.com/phamthanhhang208/SoftwareCost/server/entity"
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

func (ctrl Table5Controller) Update(c *gin.Context) {
	var req = new(dto.UpdateTable5Req)

	if err := c.ShouldBindJSON(req); err != nil {
		ginAbortNotAcceptableWithData(c, err.Error(), req)
		return
	}

	updateSpec := entity.UpdateTable5Spec{
		DistributedRank:     req.DistributedRank,
		InstantRank:         req.InstantRank,
		OnlineRank:          req.OnlineRank,
		ComplexityRank:      req.ComplexityRank,
		ReusableRank:        req.ReusableRank,
		EasyInstallRank:     req.EasyInstallRank,
		EasyUseRank:         req.EasyUseRank,
		ConvertableRank:     req.ConvertableRank,
		EasyConvertRank:     req.EasyConvertRank,
		ConcurrencyRank:     req.ConcurrencyRank,
		SpecialSecurityRank: req.SpecialSecurityRank,
		Direct3rdPartyRank:  req.Direct3rdPartyRank,
		SpecialTrainingRank: req.SpecialTrainingRank,
	}

	if err := ctrl.app.Update(c, getProjectID(c), updateSpec); err != nil {
		ginAbortInternalError(c, err.Error())
		return
	}

	ginRespOK(c)
}
