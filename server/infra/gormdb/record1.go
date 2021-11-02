package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
)

var (
	record1Md = &entity.Record1{}
)

func (r GormRepo) CreateRecord1(ctx context.Context, record1 *entity.Record1) error {
	return gDB.WithContext(ctx).Model(record1).Save(record1).Error
}

func (r GormRepo) GetRecord1ByPrj(ctx context.Context, prj string) ([]*entity.Record1, error) {
	var (
		list []*entity.Record1
	)

	err := gDB.WithContext(ctx).Model(record1Md).Where("project_uuid = ?", prj).Find(&list).Error
	if err != nil {
		return nil, err
	}

	return list, nil
}
