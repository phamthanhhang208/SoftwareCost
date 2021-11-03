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
