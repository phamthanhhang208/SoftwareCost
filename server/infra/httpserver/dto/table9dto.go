package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type GetTable9Resp struct {
	DefaultResp
	Data GetTable9Data `json:"data"`
}

type GetTable9Data struct {
	G   float64 `json:"g"`
	C   float64 `json:"c"`
	TL  float64 `json:"tl"`
	GPM float64 `json:"g_pm"`
}

func (resp *GetTable9Resp) SetData(table *entity.Table8) {
	resp.Data.G = table.CalculateG()
	resp.Data.C = table.CalculateC()
	resp.Data.TL = table.CalculateTL()
	resp.Data.GPM = table.CalculateGPM()
}
