package dto

type DefaultResp struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewDefaultResp(code int, msg string) *DefaultResp {
	return &DefaultResp{
		Code:    code,
		Message: msg,
	}
}

func (resp *DefaultResp) SetCode(code int) {
	if resp == nil {
		return
	}

	resp.Code = code
}

func (resp *DefaultResp) SetMsg(msg string) {
	if resp == nil {
		return
	}

	resp.Message = msg
}

type DefaultRespWithData struct {
	DefaultResp
	Data interface{} `json:"data"`
}

func (resp *DefaultRespWithData) SetData(data interface{}) {
	if resp == nil || data == nil {
		return
	}

	resp.Data = data
}
