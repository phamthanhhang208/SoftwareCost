package app

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type Table5Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewTable5Handler() *Table5Handler {
	return &Table5Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (h Table5Handler) Get(ctx context.Context, prj string) (*entity.Table5, error) {
	return h.repo.FirstOrCreateTable5(ctx, prj)
}

func (h Table5Handler) Update(ctx context.Context, prj string, spec entity.UpdateTable5Spec) error {
	table5, err := h.repo.FirstOrCreateTable5(ctx, prj)
	if err != nil {
		return err
	}

	if err := table5.Update(spec); err != nil {
		return err
	}

	if err := h.repo.SaveTable5(ctx, table5); err != nil {
		return err
	}

	return nil
}
