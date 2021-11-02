package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
	"gorm.io/gorm"
)

var (
	record3Md = &entity.Record3{}
)

func (g GormRepo) CreateRecord3(ctx context.Context, record3 *entity.Record3) error {
	return g.createRecord3Tx(ctx, gDB, record3)
}

func (g GormRepo) createRecord3Tx(ctx context.Context, tx *gorm.DB, record3 *entity.Record3) error {
	return tx.WithContext(ctx).Model(record3Md).Save(record3).Error
}

func (g GormRepo) GetRecord3ByPrj(ctx context.Context, prjID string) ([]*entity.Record3, error) {
	var record3s []*entity.Record3
	err := gDB.WithContext(ctx).Where("project_uuid = ?", prjID).Find(&record3s).Error
	if err != nil {
		return nil, err
	}

	return record3s, nil
}

func (g GormRepo) checkRecord3Exist(ctx context.Context, tx *gorm.DB, prj, actor string) bool {
	var count int64
	if err := tx.WithContext(ctx).Model(record3Md).
		Where("project_uuid = ? AND actor = ?", prj, actor).
		Count(&count).Error; err != nil {
		return false
	}

	if count == 1 {
		return true
	}

	return false
}

func (g GormRepo) SaveTable3(ctx context.Context, table3 *entity.Table3) error {
	return gDB.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var actorList []string
		for _, v := range table3.ActorMap {
			// the actorList is used for remove the actor that is not in the table3
			actorList = append(actorList, v.Actor)

			// check if the actor is in the table3 if not, create a new record3
			if !g.checkRecord3Exist(ctx, tx, v.ProjectUUID, v.Actor) {
				if err := g.createRecord3Tx(ctx, tx, v); err != nil {
					return err
				}
				continue
			}

			// update the existing record
			if err := tx.Model(record3Md).
				Where("project_uuid = ? AND actor = ?", v.ProjectUUID, v.Actor).
				Updates(v).Error; err != nil {
				return err
			}
		}

		if err := tx.WithContext(ctx).Model(record3Md).Where("actor NOT IN ?", actorList).Delete(&entity.Record3{}).Error; err != nil {
			return err
		}

		return nil
	})
}
