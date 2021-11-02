package app

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type Record2Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewRecord2Handler() *Record2Handler {
	return &Record2Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (h Record2Handler) Create(ctx context.Context, prj, usecase, mainactor, subactor, des, priority string) (*entity.Record2, error) {
	record2, err := h.fac.NewRecord2(prj, usecase, mainactor, subactor, des, priority)
	if err != nil {
		return nil, err
	}

	_, err = h.repo.GetProject(ctx, prj)
	if err != nil {
		return nil, err
	}

	err = h.repo.CreateRecord2(ctx, record2)
	if err != nil {
		return nil, err
	}

	return record2, nil
}

func (h Record2Handler) GetByPrj(ctx context.Context, prj string) ([]*entity.Record2, error) {
	return h.repo.GetRecord2ByPrj(ctx, prj)
}
