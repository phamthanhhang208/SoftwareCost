package app

import (
	"context"
	"errors"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type Table3Handler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewTable3Handler() *Table3Handler {
	return &Table3Handler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (h Table3Handler) GetByPrjID(ctx context.Context, projectID string) (*entity.Table3, error) {
	record2s, err := h.repo.GetRecord2ByPrj(ctx, projectID)
	if err != nil {
		return nil, err
	}

	table3 := h.fac.NewTable3FromRecord2(record2s)

	if err := h.repo.SaveTable3(ctx, table3); err != nil {
		return nil, err
	}

	record3s, err := h.repo.GetRecord3ByPrj(ctx, projectID)
	if err != nil {
		return nil, err
	}

	if err := table3.UpdateByRecord3(record3s...); err != nil {
		return nil, err
	}

	return table3, nil
}

var (
	ErrActorNotExist = errors.New("actor not exist")
)

type Table3UpdateSpec struct {
	Actor       string
	Type        string
	Description string
	Note        string
}

func (h Table3Handler) UpdateTable3(ctx context.Context, prj string, specs []Table3UpdateSpec) error {
	table3, err := h.GetByPrjID(ctx, prj)
	if err != nil {
		return err
	}

	for _, spec := range specs {
		// checking
		record3, ok := table3.ActorMap[spec.Actor]
		if !ok {
			return ErrActorNotExist
		}

		// updateing
		if err := record3.UpdateType(spec.Type); err != nil {
			return err
		}
		record3.UpdateDescription(spec.Description)
		record3.UpdateNote(spec.Note)
	}

	if err := h.repo.SaveTable3(ctx, table3); err != nil {
		return err
	}

	return nil
}
