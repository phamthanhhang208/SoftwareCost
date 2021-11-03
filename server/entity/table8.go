package entity

type Table8 struct {
	ProjectUUID string  `gorm:"Column:project_uuid; Type:text; primaryKey"`
	Salary      float64 `gorm:"Column:salary; Type:decimal"`

	Table3 Table3 `gorm:"-"`
	Table4 Table4 `gorm:"-"`
	Table5 Table5 `gorm:"-"`
	Table7 Table7 `gorm:"-"`
}

func (t *Table8) UpdateSalary(in float64) {
	t.Salary = in
}

func (t Table8) CalculateTAW() float64 {
	return float64(t.Table3.CalculateTAW())
}

func (t Table8) CalculateTBF() float64 {
	return t.Table4.CalculateTBF()
}

func (t Table8) CalculateUUCP() float64 {
	return t.CalculateTAW() + t.CalculateTBF()
}

func (t Table8) CalculateTCF() float64 {
	return t.Table5.CalculateTCF()
}

func (t Table8) CalculateEF() float64 {
	return t.Table7.CalculateEF()
}

func (t Table8) CalculateAUCP() float64 {
	return t.CalculateUUCP() * t.CalculateTCF() * t.CalculateEF()
}

func (t Table8) CalculateP() float64 {
	return t.Table7.CalculateP()
}

func (t Table8) CalculateE() float64 {
	return t.CalculateAUCP() * 10 / 6
}

func (t Table8) CalculateG() float64 {
	return 1.4 * t.CalculateE() * t.CalculateP() * t.Salary
}
