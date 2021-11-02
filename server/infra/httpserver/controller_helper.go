package httpserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/httpserver/dto"
)

func getProjectID(c *gin.Context) string {
	return c.Param("project_id")
}

func ginAbortInternalError(c *gin.Context, msg string) {
	resp := dto.NewDefaultResp(http.StatusInternalServerError, msg)
	c.AbortWithStatusJSON(http.StatusInternalServerError, resp)
	return
}

func ginAbortNotAcceptable(c *gin.Context, msg string) {
	resp := dto.NewDefaultResp(http.StatusNotAcceptable, msg)
	c.AbortWithStatusJSON(http.StatusNotAcceptable, resp)
	return
}

func ginAbortNotAcceptableWithData(c *gin.Context, msg string, data interface{}) {
	resp := new(dto.DefaultRespWithData)
	resp.SetCode(http.StatusNotAcceptable)
	resp.SetMsg(msg)
	resp.SetData(data)
	c.AbortWithStatusJSON(http.StatusNotAcceptable, resp)
	return
}

func ginRespOK(c *gin.Context) {
	resp := dto.NewDefaultResp(http.StatusOK, "")
	c.JSON(http.StatusOK, resp)
	return
}
