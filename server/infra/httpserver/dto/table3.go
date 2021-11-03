package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type GetTable3Resp struct {
	DefaultResp
	Records []Record3DTO `json:"records"`
	TAW     int          `json:"taw"`
}

type Record3DTO struct {
	Actor string `json:"actor"`
	Type  string `json:"type"`
	Des   string `json:"des"`
	Note  string `json:"note"`
}

func (resp *GetTable3Resp) SetData(data *entity.Table3) {
	if resp == nil || data == nil {
		return
	}

	resp.Records = make([]Record3DTO, 0, len(data.ActorMap))
	for _, v := range data.ActorMap {
		resp.Records = append(resp.Records, Record3DTO{
			Actor: v.Actor,
			Type:  v.Type,
			Des:   v.Description,
			Note:  v.Note,
		})
	}

	resp.TAW = data.CalculateTAW()
}

type UpdateTable3Req struct {
	Records []Record3DTO `json:"records"`
}
