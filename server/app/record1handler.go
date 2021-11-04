package app

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type Record1Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewRecord1Handler() *Record1Handler {
	return &Record1Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (r Record1Handler) CreateRecord1(ctx context.Context, prj, des, record1Type, note string) (*entity.Record1, error) {
	record1, err := r.fac.NewRecord1(prj, des, record1Type, note)
	if err != nil {
		return nil, err
	}

	_, err = r.repo.GetProject(ctx, prj)
	if err != nil {
		return nil, err
	}

	err = r.repo.CreateRecord1(ctx, record1)
	if err != nil {
		return nil, err
	}

	return record1, nil
}

func (r Record1Handler) GetByPrj(ctx context.Context, prj string) ([]*entity.Record1, error) {
	return r.repo.GetRecord1ByPrj(ctx, prj)
}
