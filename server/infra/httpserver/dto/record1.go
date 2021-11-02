package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type CreateRecord1Req struct {
	Description string `json:"description"`
	Type        string `json:"type"`
	Note        string `json:"note"`
}

type GetListRecord1Resp struct {
	DefaultResp
	Records []Record1Resp `json:"records"`
}

type Record1Resp struct {
	ID          int    `json:"id"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Note        string `json:"note"`
}

func (resp *GetListRecord1Resp) SetData(records ...*entity.Record1) {
	for _, record := range records {
		resp.Records = append(resp.Records, Record1Resp{
			ID:          record.ID,
			Description: record.Description,
			Type:        record.Type,
			Note:        record.Note,
		})
	}
}
