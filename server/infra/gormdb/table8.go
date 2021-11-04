package gormdb

import (
	"context"
	"log"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
)

var (
	table8Md = &entity.Table8{}
)

func (g GormRepo) FirstOrCreateTable8(ctx context.Context, prj string) (*entity.Table8, error) {
	var table = &entity.Table8{
		ProjectUUID: prj,
	}
	err := gDB.WithContext(ctx).Model(table8Md).Where("project_uuid = ?", prj).FirstOrCreate(table).Error
	if err != nil {
		return nil, err
	}

	return table, nil
}

func (g GormRepo) SaveTable8(ctx context.Context, table *entity.Table8) error {
	log.Println(table)
	return gDB.WithContext(ctx).Model(table8Md).Where("project_uuid = ?", table.ProjectUUID).Save(table).Error
}
