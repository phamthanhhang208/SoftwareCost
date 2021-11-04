package entity

type Record2 struct {
	ID          int    `gorm:"Column:id; primaryKey; autoIncrement"`
	ProjectUUID string `gorm:"Column:project_uuid; Type:text; index:project_usecase,unique"`
	UseCaseName string `gorm:"Column:use_case_name; Type:text; index:project_usecase"`
	MainActor   string `gorm:"Column:main_actor; Type:text"`
	SubActor    string `gorm:"Column:sub_actor; Type:text"`
	Description string `gorm:"Column:description; Type:text"`
	Priority    string `gorm:"Column:priority; Type:text"`
}
