package entity

type Record1 struct {
	ID          int    `gorm:"Column:id; primaryKey; autoIncrement"`
	ProjectUUID string `gorm:"Column:project_uuid; Type:text; index:project_description,unique"`
	Description string `gorm:"Column:description; Type:text; index:project_description"`
	Type        string `gorm:"Column:type; Type:text"`
	Note        string `gorm:"Column:note; Type:text"`
}
