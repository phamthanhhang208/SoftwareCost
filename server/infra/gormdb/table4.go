package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"gorm.io/gorm"
)

var (
	table4Md = &entity.Table4{}
)

func (g GormRepo) GetTable4(ctx context.Context, prj string) (*entity.Table4, error) {
	var table4 = new(entity.Table4)
	err := gDB.WithContext(ctx).Model(table4Md).Where("project_uuid = ?", prj).Take(table4).Error
	if err != nil {
		return nil, err
	}

	return table4, nil
}

func (g GormRepo) SaveTable4(ctx context.Context, table4 *entity.Table4) error {
	return gDB.Transaction(func(tx *gorm.DB) error {
		// check if table4 exist
		var count int64
		err := tx.WithContext(ctx).Model(table4Md).Where("project_uuid = ?", table4.ProjectUUID).Count(&count).Error
		if err != nil {
			return err
		}

		// create a new table if not exist
		if count == 0 {
			err = tx.WithContext(ctx).Model(table4Md).Create(table4).Error
			if err != nil {
				return err
			}
			return nil
		}

		// update the existing table
		err = tx.WithContext(ctx).Model(table4Md).Save(table4).Error
		if err != nil {
			return err
		}

		return nil
	})
}

func (g GormRepo) DeleteTable4(ctx context.Context, prj string) error {
	return gDB.WithContext(ctx).Model(table4Md).Where("project_uuid = ?", prj).Delete(&entity.Table4{}).Error
}
