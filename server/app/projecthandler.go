package app

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"github.com/phamthanhhang208/SoftwareCost/server/infra/gormdb"
)

type ProjectHandler struct {
	fac  *entity.Factory
	repo *gormdb.GormRepo
}

func NewProjectHandler() *ProjectHandler {
	return &ProjectHandler{
		fac:  entity.NewFactory(),
		repo: gormdb.NewGormRepo(),
	}
}

func (p ProjectHandler) CreateProject(ctx context.Context, name string) (*entity.Project, error) {
	prj := p.fac.NewProject(name)

	err := p.repo.CreateProject(ctx, prj)
	if err != nil {
		return nil, err
	}

	return prj, err
}
