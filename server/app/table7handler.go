package app

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type Table7Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewTable7Handler() *Table7Handler {
	return &Table7Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (h Table7Handler) GetTable7(ctx context.Context, prj string) (*entity.Table7, error) {
	employee, err := h.repo.GetRecord7Employee(ctx, prj)
	if err != nil {
		return nil, err
	}

	project, err := h.repo.FirstOrCreateRecord7Project(ctx, prj)
	if err != nil {
		return nil, err
	}

	table7 := h.fac.NewTable7(prj, employee, *project)

	return table7, err
}

func (h Table7Handler) CreateEmployee(ctx context.Context, prj string, rupRank, similarRank, oopRank, leaderRank, activeRank int) (*entity.Record7Employee, error) {
	record7, err := h.fac.NewRecord7Employee(prj, rupRank, similarRank, oopRank, leaderRank, activeRank)
	if err != nil {
		return nil, err
	}

	if err := h.repo.SaveRecord7Employee(ctx, record7); err != nil {
		return nil, err
	}

	return record7, nil
}

func (h Table7Handler) UpdateProject(ctx context.Context, prj string, requestStableRank, partTimeRank, hardLanguageRank int) error {
	projectRecord, err := h.repo.FirstOrCreateRecord7Project(ctx, prj)
	if err != nil {
		return err
	}

	if err := projectRecord.Update(requestStableRank, partTimeRank, hardLanguageRank); err != nil {
		return err
	}

	if err := h.repo.SaveRecord7Project(ctx, prj, projectRecord); err != nil {
		return err
	}

	return nil
}
