package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
)

var (
	prjMd = &entity.Project{}
)

func (r GormRepo) CreateProject(ctx context.Context, prj *entity.Project) error {
	return gDB.WithContext(ctx).Model(prjMd).Create(prj).Error
}

func (r GormRepo) GetProject(ctx context.Context, id string) (*entity.Project, error) {
	prj := new(entity.Project)
	err := gDB.WithContext(ctx).Model(prjMd).Where("uuid = ?", id).Take(prj).Error
	if err != nil {
		return nil, err
	}

	return prj, nil
}
