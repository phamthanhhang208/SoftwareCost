package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
)

var (
	table5Md = &entity.Table5{}
)

func (g GormRepo) FirstOrCreateTable5(ctx context.Context, prj string) (*entity.Table5, error) {
	var table5 entity.Table5

	table5.ProjectUUID = prj

	err := gDB.WithContext(ctx).Where("project_uuid = ?", prj).FirstOrCreate(&table5).Error
	return &table5, err
}

func (g GormRepo) SaveTable5(ctx context.Context, table5 *entity.Table5) error {
	return gDB.WithContext(ctx).Model(table5Md).Save(table5).Error
}
