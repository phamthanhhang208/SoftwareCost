package gormdb

import (
	"context"

	"github.com/phamthanhhang208/SoftwareCost/server/entity"
)

var (
	record7EmployeeMd = &entity.Record7Employee{}
	record7ProjectMd  = &entity.Record7Project{}
)

func (g GormRepo) GetRecord7Employee(ctx context.Context, projectUUID string) ([]entity.Record7Employee, error) {
	var (
		records []entity.Record7Employee
	)
	if err := gDB.WithContext(ctx).Model(record7EmployeeMd).Where("project_uuid = ?", projectUUID).Find(&records).Error; err != nil {
		return nil, err
	}

	return records, nil
}

func (g GormRepo) SaveRecord7Employee(ctx context.Context, record *entity.Record7Employee) error {
	return gDB.WithContext(ctx).Model(record7EmployeeMd).Save(record).Error
}

func (g GormRepo) FirstOrCreateRecord7Project(ctx context.Context, project string) (*entity.Record7Project, error) {
	var record = &entity.Record7Project{
		ProjectUUID: project,
	}
	err := gDB.WithContext(ctx).Model(record7ProjectMd).Where("project_uuid = ?", project).FirstOrCreate(record).Error
	if err != nil {
		return nil, err
	}

	return record, nil
}

func (g GormRepo) SaveRecord7Project(ctx context.Context, project string, record *entity.Record7Project) error {
	return gDB.WithContext(ctx).Model(record7ProjectMd).Where("project_uuid = ?", project).Updates(record).Error
}
