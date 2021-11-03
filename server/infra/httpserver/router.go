package httpserver

import "github.com/gin-gonic/gin"

func NewRouter() *gin.Engine {
	r := gin.New()

	prjsGr := r.Group("/projects")
	{
		prjCtrl := NewPrjCtrl()
		prjsGr.POST("", prjCtrl.CreateProject)

		prjCtrlGr := prjsGr.Group("/:project_id")
		{
			table1Ctrl := NewTable1Ctrl()
			prjCtrlGr.POST("/table1", table1Ctrl.CreateRecord1)
			prjCtrlGr.GET("/table1", table1Ctrl.GetList)

			table2Ctrl := NewTable2Ctrl()
			prjCtrlGr.POST("/table2", table2Ctrl.Create)
			prjCtrlGr.GET("/table2", table2Ctrl.GetList)

			table3Ctrl := NewTable3Ctrl()
			prjCtrlGr.GET("/table3", table3Ctrl.Get)
			prjCtrlGr.PUT("/table3", table3Ctrl.Update)

			table4Ctrl := NewTable4Ctrl()
			prjCtrlGr.GET("/table4", table4Ctrl.Get)
			prjCtrlGr.PUT("/table4", table4Ctrl.Update)

			table5Ctrl := NewTable5Ctrl()
			prjCtrlGr.GET("/table5", table5Ctrl.Get)
			prjCtrlGr.PUT("/table5", table5Ctrl.Update)

			table7Ctrl := NewTable7Controller()
			prjCtrlGr.GET("/table7", table7Ctrl.Get)
			prjCtrlGr.POST("/table7/employee", table7Ctrl.CreateEmployee)
			prjCtrlGr.PUT("/table7/project", table7Ctrl.UpdateProject)

			table8Ctrl := NewTable8Ctrl()
			prjCtrlGr.GET("/table8", table8Ctrl.Get)
			prjCtrlGr.PUT("/table8", table8Ctrl.Update)
		}
	}

	return r
}
