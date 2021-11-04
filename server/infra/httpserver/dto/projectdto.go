package dto

type CreateProjectReq struct {
	Name string `json:"name"`
}

type CreateProjectResp struct {
	DefaultResp
	ProjectID string `json:"project_id"`
}

func (resp *CreateProjectResp) SetData(id string) {
	resp.ProjectID = id
	return
}
