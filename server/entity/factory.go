package entity

import (
	"errors"
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
		if i == len(record1Types)-1 {
			return nil, ErrRecord1InvalidType
		}
	}

	return &Record1{
		ProjectUUID: prj,
		Description: des,
		Type:        record1Type,
		Note:        note,
	}, nil
}

var (
	record2Priorities         = []string{"B", "M", "T"}
	ErrRecord2InvalidPriority = fmt.Errorf("record 2 priorities must be 1 of %s", strings.Join(record2Priorities, ", "))
)

func (fac Factory) NewRecord2(prj, usecase, mainactor, subactor, des, priority string) (*Record2, error) {
	for i := range record2Priorities {
		if priority == record2Priorities[i] {
			break
		}

		if i == len(record2Priorities)-1 {
			return nil, ErrRecord2InvalidPriority
		}
	}

	return &Record2{
		ProjectUUID: prj,
		UseCaseName: usecase,
		MainActor:   mainactor,
		SubActor:    subactor,
		Description: des,
		Priority:    priority,
	}, nil
}

func (fac Factory) NewRecord3(prj, actor, record3type, des, note string) (*Record3, error) {
	if err := validateRecord3Type(record3type); err != nil {
		return nil, err
	}

	return &Record3{
		ProjectUUID: prj,
		Actor:       actor,
		Type:        record3type,
		Description: des,
		Note:        note,
	}, nil
}

func (fac Factory) NewTable3FromRecord2(record2s []*Record2) *Table3 {
	var actorMap = make(map[string]*Record3)

	for i := range record2s {
		fmt.Println(record2s[i].MainActor, record2s[i].SubActor)
		if record2s[i].MainActor != "" {
			_, ok := actorMap[record2s[i].MainActor]
			if !ok {
				record3, _ := fac.NewRecord3(record2s[i].ProjectUUID, record2s[i].MainActor, "", "", "")
				actorMap[record2s[i].MainActor] = record3
			}
		}

		if record2s[i].SubActor != "" {
			_, ok := actorMap[record2s[i].SubActor]
			if !ok {
				record3, _ := fac.NewRecord3(record2s[i].ProjectUUID, record2s[i].SubActor, "", "", "")
				actorMap[record2s[i].SubActor] = record3
			}
		}
	}

	return &Table3{
		ActorMap: actorMap,
	}
}

func (fac Factory) NewTable4FromRecord2(prj string, record2s []*Record2) *Table4 {
	var (
		bTotal, mTotal, tTotal int
	)

	for i := range record2s {
		switch record2s[i].Priority {
		case "B":
			bTotal++
		case "M":
			mTotal++
		case "T":
			tTotal++
		}
	}

	return &Table4{
		ProjectUUID: prj,
		BTotal:      bTotal,
		MTotal:      mTotal,
		TTotal:      tTotal,
	}
}

type CreateTable5Spec struct {
	ProjectUUID         string
	DistributedRank     int
	InstantRank         int
	OnlineRank          int
	ComplexityRank      int
	ReusableRank        int
	EasyInstallRank     int
	EasyUseRank         int
	ConvertableRank     int
	EasyConvertRank     int
	ConcurrencyRank     int
	SpecialSecurityRank int
	Direct3rdPartyRank  int
	SpecialTrainingRank int
}

func (fac Factory) NewTable5(prj string, spec CreateTable5Spec) (*Table5, error) {
	if !checkTable5Rank(spec.DistributedRank) {
		return nil, errors.New("invalid DistributedRank")
	}
	if !checkTable5Rank(spec.InstantRank) {
		return nil, errors.New("invalid InstantRank")
	}
	if !checkTable5Rank(spec.OnlineRank) {
		return nil, errors.New("invalid OnlineRank")
	}
	if !checkTable5Rank(spec.ComplexityRank) {
		return nil, errors.New("invalid ComplexityRank")
	}
	if !checkTable5Rank(spec.ReusableRank) {
		return nil, errors.New("invalid ReusableRank")
	}
	if !checkTable5Rank(spec.EasyInstallRank) {
		return nil, errors.New("invalid EasyInstallRank")
	}
	if !checkTable5Rank(spec.EasyUseRank) {
		return nil, errors.New("invalid EasyUseRank")
	}
	if !checkTable5Rank(spec.ConvertableRank) {
		return nil, errors.New("invalid ConvertableRank")
	}
	if !checkTable5Rank(spec.EasyConvertRank) {
		return nil, errors.New("invalid EasyConvertRank")
	}
	if !checkTable5Rank(spec.ConcurrencyRank) {
		return nil, errors.New("invalid ConcurrencyRank")
	}
	if !checkTable5Rank(spec.SpecialSecurityRank) {
		return nil, errors.New("invalid SpecialSecurityRank")
	}
	if !checkTable5Rank(spec.Direct3rdPartyRank) {
		return nil, errors.New("invalid Direct3rdPartyRank")
	}

	return &Table5{
		ProjectUUID:         prj,
		DistributedRank:     spec.DistributedRank,
		InstantRank:         spec.InstantRank,
		OnlineRank:          spec.OnlineRank,
		ComplexityRank:      spec.ComplexityRank,
		ReusableRank:        spec.ReusableRank,
		EasyInstallRank:     spec.EasyInstallRank,
		EasyUseRank:         spec.EasyUseRank,
		ConvertableRank:     spec.ConvertableRank,
		EasyConvertRank:     spec.EasyConvertRank,
		ConcurrencyRank:     spec.ConcurrencyRank,
		SpecialSecurityRank: spec.SpecialSecurityRank,
		Direct3rdPartyRank:  spec.Direct3rdPartyRank,
	}, nil
}
