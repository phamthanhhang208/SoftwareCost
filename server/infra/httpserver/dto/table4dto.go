package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type GetTable4Resp struct {
	DefaultResp
	Data struct {
		BTotal   int `json:"b_total"`
		BSimple  int `json:"b_simple"`
		BMedium  int `json:"b_medium"`
		BComplex int `json:"b_complex"`

		MTotal   int `json:"m_total"`
		MSimple  int `json:"m_simple"`
		MMedium  int `json:"m_medium"`
		MComplex int `json:"m_complex"`

		TTotal   int `json:"t_total"`
		TSimple  int `json:"t_simple"`
		TMedium  int `json:"t_medium"`
		TComplex int `json:"t_complex"`
	} `json:"data"`
	TBF float64 `json:"tbf"`
}

func (resp *GetTable4Resp) SetData(data *entity.Table4) {
	resp.Data.BTotal = data.BTotal
	resp.Data.BSimple = data.BSimple
	resp.Data.BMedium = data.BMedium
	resp.Data.BComplex = data.BComplex

	resp.Data.MTotal = data.MTotal
	resp.Data.MSimple = data.MSimple
	resp.Data.MMedium = data.MMedium
	resp.Data.MComplex = data.MComplex

	resp.Data.TTotal = data.TTotal
	resp.Data.TSimple = data.TSimple
	resp.Data.TMedium = data.TMedium
	resp.Data.TComplex = data.TComplex

	resp.TBF = data.CalculateTBF()
}

type UpdateTable4Req struct {
	BSimple  int `json:"b_simple"`
	BMedium  int `json:"b_medium"`
	BComplex int `json:"b_complex"`

	MSimple  int `json:"m_simple"`
	MMedium  int `json:"m_medium"`
	MComplex int `json:"m_complex"`

	TSimple  int `json:"t_simple"`
	TMedium  int `json:"t_medium"`
	TComplex int `json:"t_complex"`
}
