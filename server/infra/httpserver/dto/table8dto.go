package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type GetTable8Resp struct {
	DefaultResp
	Data GetTable8Data `json:"data"`
}

type GetTable8Data struct {
	TAW  float64 `json:"taw"`
	TBF  float64 `json:"tbf"`
	UUCP float64 `json:"uucp"`
	TCF  float64 `json:"tcf"`
	EF   float64 `json:"ef"`
	AUCP float64 `json:"aucp"`
	P    float64 `json:"p"`
	E    float64 `json:"e"`
	H    float64 `json:"h"`
	G    float64 `json:"g"`
}

func (resp *GetTable8Resp) SetData(table *entity.Table8) {
	resp.Data.TAW = table.CalculateTAW()
	resp.Data.TBF = table.CalculateTBF()
	resp.Data.UUCP = table.CalculateUUCP()
	resp.Data.TCF = table.CalculateTCF()
	resp.Data.EF = table.CalculateEF()
	resp.Data.AUCP = table.CalculateAUCP()
	resp.Data.P = table.CalculateP()
	resp.Data.E = table.CalculateE()
	resp.Data.H = table.Salary
	resp.Data.G = table.CalculateG()
}

type UpdateTable8Req struct {
	H float64 `json:"h"`
}
