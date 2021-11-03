package dto

import "github.com/phamthanhhang208/SoftwareCost/server/entity"

type GetTable7Resp struct {
	DefaultResp
	Data   GetTable7Data            `json:"data"`
	Result entity.InterpolateResult `json:"result"`
	EFW    float64                  `json:"efw"`
	EF     float64                  `json:"ef"`
	ES     float64                  `json:"es"`
	P      float64                  `json:"p"`
}

type GetTable7Data struct {
	Employee []GetTable7DataEmployee `json:"employee"`
	Project  GetTable7DataProject    `json:"project"`
}

type GetTable7DataEmployee struct {
	ID          int `json:"id"`
	RUPRank     int `json:"rup_rank"`
	SimilarRank int `json:"similar_rank"`
	OOPRank     int `json:"oop_rank"`
	LeaderRank  int `json:"leader_rank"`
	ActiveRank  int `json:"active_rank"`
}

type GetTable7DataProject struct {
	RequestStableRank int `json:"request_stable_rank"`
	PartTimeRank      int `json:"part_time_rank"`
	HardLanguageRank  int `json:"hard_language_rank"`
}

func (resp *GetTable7Resp) SetData(table *entity.Table7) {
	resp.Data = GetTable7Data{
		Project: GetTable7DataProject{
			RequestStableRank: table.Project.RequestStableRank,
			PartTimeRank:      table.Project.PartTimeRank,
			HardLanguageRank:  table.Project.HardLanguageRank,
		},
	}

	for i := range table.EmployeeRecords {
		resp.Data.Employee = append(resp.Data.Employee, GetTable7DataEmployee{
			ID:          table.EmployeeRecords[i].ID,
			RUPRank:     table.EmployeeRecords[i].RUPRank,
			SimilarRank: table.EmployeeRecords[i].SimilarRank,
			OOPRank:     table.EmployeeRecords[i].OOPRank,
			LeaderRank:  table.EmployeeRecords[i].LeaderRank,
			ActiveRank:  table.EmployeeRecords[i].ActiveRank,
		})
	}

	resp.Result = table.CalculateResult()
	resp.EFW = table.CaculateEFW()
	resp.EF = table.CalculateEF()
	resp.ES = table.CalculateES()
	resp.P = table.CalculateP()

}

type CreateRecord7EmployeeReq struct {
	RUPRank     int `json:"rup_rank"`
	SimilarRank int `json:"similar_rank"`
	OOPRank     int `json:"oop_rank"`
	LeaderRank  int `json:"leader_rank"`
	ActiveRank  int `json:"active_rank"`
}

type UpdateRecord7ProjectReq struct {
	RequestStableRank int `json:"request_stable_rank"`
	PartTimeRank      int `json:"part_time_rank"`
	HardLanguageRank  int `json:"hard_language_rank"`
}
