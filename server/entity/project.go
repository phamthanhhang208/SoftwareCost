package entity

type Project struct {
	UUID string `gorm:"Column:uuid; Type:string; primaryKey"`
	Name string `gorm:"Column:name; Type:text"`
}
