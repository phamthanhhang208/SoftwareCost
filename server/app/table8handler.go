package app

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type Table8Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
	t3   *Table3Handler
	t4   *Table4Handler
	t5   *Table5Handler
	t7   *Table7Handler
}

func NewTable8Handler() *Table8Handler {
	return &Table8Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
		t3:   NewTable3Handler(),
		t4:   NewTable4Handler(),
		t5:   NewTable5Handler(),
		t7:   NewTable7Handler(),
	}
}

func (h Table8Handler) Get(ctx context.Context, prj string) (*entity.Table8, error) {
	table3, err := h.t3.GetByPrjID(ctx, prj)
	if err != nil {
		return nil, err
	}

	table4, err := h.t4.GetByPrjID(ctx, prj)
	if err != nil {
		return nil, err
	}

	table5, err := h.t5.Get(ctx, prj)
	if err != nil {
		return nil, err
	}

	table7, err := h.t7.GetTable7(ctx, prj)
	if err != nil {
		return nil, err
	}

	table8, err := h.repo.FirstOrCreateTable8(ctx, prj)
	if err != nil {
		return nil, err
	}

	resT8 := h.fac.NewTable8(prj, table8.Salary, table3, table4, table5, table7)

	return resT8, nil
}

func (h Table8Handler) Update(ctx context.Context, prj string, salary float64) error {
	table8, err := h.repo.FirstOrCreateTable8(ctx, prj)
	if err != nil {
		return err
	}

	table8.UpdateSalary(salary)

	if err := h.repo.SaveTable8(ctx, table8); err != nil {
		return err
	}

	return nil
}
