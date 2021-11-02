package entity

import (
	"fmt"
	"strings"

	"github.com/google/uuid"
)

type Factory struct{}

func NewFactory() *Factory {
	return &Factory{}
}

func (fac Factory) NewProject(name string) *Project {
	return &Project{
		UUID: uuid.NewString(),
		Name: name,
	}
}

var (
	record1Types          = []string{"data input", "data output", "queries", "database", "search data"}
	ErrRecord1InvalidType = fmt.Errorf("record 1 types must be 1 of %s", strings.Join(record1Types, ", "))
)

func (fac Factory) NewRecord1(prj, des, record1Type, note string) (*Record1, error) {
	for i := range record1Types {
		if record1Type == record1Types[i] {
			break
		}

		return nil, ErrRecord1InvalidType
	}

	return &Record1{
		ProjectUUID: prj,
		Description: des,
		Type:        record1Type,
		Note:        note,
	}, nil
}
