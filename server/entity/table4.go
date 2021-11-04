package entity

import "errors"

type Table4 struct {
	ProjectUUID string `gorm:"Column:project_uuid; Type:text; primaryKey"`
	BTotal      int    `gorm:"Column:b_total; Type:int"`
	BSimple     int    `gorm:"Column:b_simple; Type:int"`
	BMedium     int    `gorm:"Column:b_medium; Type:int"`
	BComplex    int    `gorm:"Column:b_complex; Type:int"`
	MTotal      int    `gorm:"Column:m_total; Type:int"`
	MSimple     int    `gorm:"Column:m_simple; Type:int"`
	MMedium     int    `gorm:"Column:m_medium; Type:int"`
	MComplex    int    `gorm:"Column:m_complex; Type:int"`
	TTotal      int    `gorm:"Column:t_total; Type:int"`
	TSimple     int    `gorm:"Column:t_simple; Type:int"`
	TMedium     int    `gorm:"Column:t_medium; Type:int"`
	TComplex    int    `gorm:"Column:t_complex; Type:int"`
}

func (t Table4) CalculateTBF() float64 {
	var TBF float64

	TBF += float64(t.BSimple) * 5
	TBF += float64(t.BMedium) * 10
	TBF += float64(t.BComplex) * 15

	TBF += float64(t.MSimple) * 5 * 1.2
	TBF += float64(t.MMedium) * 10 * 1.2
	TBF += float64(t.MComplex) * 15 * 1.2

	TBF += float64(t.TSimple) * 5 * 1.2
	TBF += float64(t.TMedium) * 10 * 1.2
	TBF += float64(t.TComplex) * 15 * 1.2

	return TBF
}

func (t Table4) CompareTotal(table4 *Table4) bool {
	if t.ProjectUUID != table4.ProjectUUID {
		return false
	}

	if t.BTotal != table4.BTotal {
		return false
	}

	if t.MTotal != table4.MTotal {
		return false
	}

	if t.TTotal != table4.TTotal {
		return false
	}

	return true
}

func (t Table4) Validate() error {
	bTotalTmp := t.BSimple + t.BMedium + t.BComplex
	if bTotalTmp != 0 && bTotalTmp != t.BTotal {
		return errors.New("sum of B is not valid")
	}

	mTotalTmp := t.MSimple + t.MMedium + t.MComplex
	if mTotalTmp != 0 && mTotalTmp != t.MTotal {
		return errors.New("sum of M is not valid")
	}

	tTotalTmp := t.TSimple + t.TMedium + t.TComplex
	if tTotalTmp != 0 && tTotalTmp != t.TTotal {
		return errors.New("sum of T is not valid")
	}

	return nil
}
