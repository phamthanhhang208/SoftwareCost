package app

import (
	"context"
	"errors"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
	"gorm.io/gorm"
)

type Table4Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewTable4Handler() *Table4Handler {
	return &Table4Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (h Table4Handler) GetByPrjID(ctx context.Context, prjID string) (*entity.Table4, error) {
	// form a new table 4 from record 2
	record2s, err := h.repo.GetRecord2ByPrj(ctx, prjID)
	if err != nil {
		return nil, err
	}

	table4New := h.fac.NewTable4FromRecord2(prjID, record2s)

	// get table 4 from db
	table4DB, err := h.repo.GetTable4(ctx, prjID)
	if err != nil {
		// if the record is not found, create a new one
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := h.repo.SaveTable4(ctx, table4New); err != nil {
				return nil, err
			}
			return table4New, nil
		}
		return nil, err
	}

	// if the total is not changed, return the db table 4
	if table4New.CompareTotal(table4DB) {
		return table4DB, nil
	}

	// if the total is changed, delete the old table 4 and insert the new one
	if err := h.repo.SaveTable4(ctx, table4New); err != nil {
		return nil, err
	}

	return table4New, nil
}

type UpdateTable4Spec struct {
	Project  string
	BSimple  int
	BMedium  int
	BComplex int

	MSimple  int
	MMedium  int
	MComplex int

	TSimple  int
	TMedium  int
	TComplex int
}

func (h Table4Handler) Update(ctx context.Context, spec UpdateTable4Spec) error {
	table4, err := h.GetByPrjID(ctx, spec.Project)
	if err != nil {
		return err
	}

	table4.BSimple = spec.BSimple
	table4.BMedium = spec.BMedium
	table4.BComplex = spec.BComplex

	table4.MSimple = spec.MSimple
	table4.MMedium = spec.MMedium
	table4.MComplex = spec.MComplex

	table4.TSimple = spec.TSimple
	table4.TMedium = spec.TMedium
	table4.TComplex = spec.TComplex

	if err := table4.Validate(); err != nil {
		return err
	}

	// save the new table 4
	if err := h.repo.SaveTable4(ctx, table4); err != nil {
		return err
	}

	return nil
}
