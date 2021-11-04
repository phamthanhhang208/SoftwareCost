package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type CreateRecord2Req struct {
	Usecase   string `json:"usecase"`
	MainActor string `json:"main_actor"`
	SubActor  string `json:"sub_actor"`
	Des       string `json:"des"`
	Priority  string `json:"priority"`
}

type GetListRecord2Resp struct {
	DefaultResp
	Records []Record2Resp `json:"records"`
}

type Record2Resp struct {
	Usecase   string `json:"usecase"`
	MainActor string `json:"main_actor"`
	SubActor  string `json:"sub_actor"`
	Des       string `json:"des"`
	Priority  string `json:"priority"`
}

func (resp *GetListRecord2Resp) SetData(record2s ...*entity.Record2) {
	for _, record2 := range record2s {
		resp.Records = append(resp.Records, Record2Resp{
			Usecase:   record2.UseCaseName,
			MainActor: record2.MainActor,
			SubActor:  record2.SubActor,
			Des:       record2.Description,
			Priority:  record2.Priority,
		})
	}
}
