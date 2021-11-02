package entity

type Record1 struct {
	ID          int    `gorm:"Column:id; Type:bigint; primaryKey; autoIncrement"`
	ProjectUUID string `gorm:"Column:project_uuid; Type:text"`
	Description string `gorm:"Column:description; Type:text"`
	Type        string `gorm:"Column:type; Type:text"`
	Note        string `gorm:"Column:note; Type:text"`
}
