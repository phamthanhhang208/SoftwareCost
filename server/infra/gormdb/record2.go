package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
)

var (
	record2Model = &entity.Record2{}
)

func (g GormRepo) CreateRecord2(ctx context.Context, record2 *entity.Record2) error {
	return gDB.WithContext(ctx).Model(record2Model).Save(record2).Error
}

func (g GormRepo) GetRecord2ByPrj(ctx context.Context, prjID string) ([]*entity.Record2, error) {
	var record2s []*entity.Record2

	err := gDB.WithContext(ctx).Model(record2Model).Where("project_uuid = ?", prjID).Find(&record2s).Error
	if err != nil {
		return nil, err
	}

	return record2s, nil
}
