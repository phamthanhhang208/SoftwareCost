package entity

import (
	"fmt"
	"strings"
)

type Record3 struct {
	ID          int    `gorm:"Column:id; primaryKey"`
	ProjectUUID string `gorm:"Column:project_uuid; Type:text; index:project_actor,unique"`
	Actor       string `gorm:"Column:actor; Type:text; index:project_actor"`
	Type        string `gorm:"Column:type; Type:text"`
	Description string `gorm:"Column:description; Type:text"`
	Note        string `gorm:"Column:note; Type:text"`
}

func (r *Record3) UpdateType(inType string) error {
	if err := validateRecord3Type(inType); err != nil {
		return err
	}
	r.Type = inType
	return nil
}

func (r *Record3) UpdateDescription(inDescription string) {
	if inDescription == "" || inDescription == r.Description {
		return
	}
	r.Description = inDescription
}

func (r *Record3) UpdateNote(inNote string) {
	if inNote == "" || inNote == r.Note {
		return
	}
	r.Note = inNote
}

var (
	record3Types          = []string{"simple", "medium", "complex"}
	ErrRecord3InvalidType = fmt.Errorf("record 3 types must be 1 of %s", strings.Join(record3Types, ", "))
)

func validateRecord3Type(inputType string) error {
	if inputType == "" {
		return nil
	}

	for _, t := range record3Types {
		if t == inputType {
			return nil
		}
	}
	return ErrRecord3InvalidType
}

type Table3 struct {
	ActorMap map[string]*Record3 // actor -> record
}

func (t *Table3) UpdateByRecord3(records ...*Record3) error {
	for i := range records {
		record3, ok := t.ActorMap[records[i].Actor]
		if !ok {
			return fmt.Errorf("actor %s not found", records[i].Actor)
		}
		record3.UpdateType(records[i].Type)
		record3.UpdateDescription(records[i].Description)
		record3.UpdateNote(records[i].Note)
	}

	return nil
}
