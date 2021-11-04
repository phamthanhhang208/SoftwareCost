package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type GetTable5Resp struct {
	DefaultResp
	Data struct {
		DistributedRank     int
		InstantRank         int
		OnlineRank          int
		ComplexityRank      int
		ReusableRank        int
		EasyInstallRank     int
		EasyUseRank         int
		ConvertableRank     int
		EasyConvertRank     int
		ConcurrencyRank     int
		SpecialSecurityRank int
		Direct3rdPartyRank  int
		SpecialTrainingRank int
	} `json:"data"`
	TFW float64 `json:"tfw"`
	TCF float64 `json:"tcf"`
}

func (resp *GetTable5Resp) SetData(table *entity.Table5) {
	resp.Data.DistributedRank = table.DistributedRank
	resp.Data.InstantRank = table.InstantRank
	resp.Data.OnlineRank = table.OnlineRank
	resp.Data.ComplexityRank = table.ComplexityRank
	resp.Data.ReusableRank = table.ReusableRank
	resp.Data.EasyInstallRank = table.EasyInstallRank
	resp.Data.EasyUseRank = table.EasyUseRank
	resp.Data.ConvertableRank = table.ConvertableRank
	resp.Data.EasyConvertRank = table.EasyConvertRank
	resp.Data.ConcurrencyRank = table.ConcurrencyRank
	resp.Data.SpecialSecurityRank = table.SpecialSecurityRank
	resp.Data.Direct3rdPartyRank = table.Direct3rdPartyRank
	resp.Data.SpecialTrainingRank = table.SpecialTrainingRank

	resp.TFW = table.CalculateTFW()
	resp.TCF = table.CalculateTCF()
}

type UpdateTable5Req struct {
	DistributedRank     int
	InstantRank         int
	OnlineRank          int
	ComplexityRank      int
	ReusableRank        int
	EasyInstallRank     int
	EasyUseRank         int
	ConvertableRank     int
	EasyConvertRank     int
	ConcurrencyRank     int
	SpecialSecurityRank int
	Direct3rdPartyRank  int
	SpecialTrainingRank int
}
