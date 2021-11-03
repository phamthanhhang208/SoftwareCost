package entity

import "errors"

type Table7 struct {
	ProjectUUID     string
	EmployeeRecords []Record7Employee
	Project         Record7Project
}

type InterpolateResult struct {
	Employee InterpolateEmployee `json:"employee"`
	Project  InterpolateProject  `json:"project"`
}

type InterpolateEmployee struct {
	RUPRankValue           float64 `json:"rup_rank_value"`
	RUPRankInterpolate     float64 `json:"rup_rank_interpolate"`
	SimilarRankValue       float64 `json:"similar_rank_value"`
	SimilarRankInterpolate float64 `json:"similar_rank_interpolate"`
	OOPRankValue           float64 `json:"oop_rank_value"`
	OOPRankInterpolate     float64 `json:"oop_rank_interpolate"`
	LeaderRankValue        float64 `json:"leader_rank_value"`
	LeaderRankInterpolate  float64 `json:"leader_rank_interpolate"`
	ActiveRankValue        float64 `json:"active_rank_value"`
	ActiveRankInterpolate  float64 `json:"active_rank_interpolate"`
}

type InterpolateProject struct {
	RequestStableValue       float64 `json:"request_stable_value"`
	RequestStableInterpolate float64 `json:"request_stable_interpolate"`
	PartTimeValue            float64 `json:"part_time_value"`
	PartTimeInterpolate      float64 `json:"part_time_interpolate"`
	HardLanguageValue        float64 `json:"hard_language_value"`
	HardLanguageInterpolate  float64 `json:"hard_language_interpolate"`
}

func (t Table7) interpolate(in float64) float64 {
	switch {
	case in > 3:
		return 1
	case in > 2:
		return 0.6
	case in > 1:
		return 0.1
	case in > 0:
		return 0.05
	default:
		return 0
	}
}

func (t Table7) CalculateResult() InterpolateResult {
	var (
		totalEmployee    int
		totalRUPRank     int
		totalSimilarRank int
		totalOOPRank     int
		totalLeaderRank  int
		totalActiveRank  int
	)
	for i := range t.EmployeeRecords {
		totalEmployee++
		totalRUPRank += t.EmployeeRecords[i].RUPRank
		totalSimilarRank += t.EmployeeRecords[i].SimilarRank
		totalOOPRank += t.EmployeeRecords[i].OOPRank
		totalLeaderRank += t.EmployeeRecords[i].LeaderRank
		totalActiveRank += t.EmployeeRecords[i].ActiveRank
	}

	// avoiding NaN
	if totalEmployee == 0 {
		totalEmployee = 1
	}

	return InterpolateResult{
		Employee: InterpolateEmployee{
			RUPRankValue:           float64(totalRUPRank) / float64(totalEmployee) * 1.5,
			RUPRankInterpolate:     t.interpolate(float64(totalRUPRank) / float64(totalEmployee) * 1.5),
			SimilarRankValue:       float64(totalSimilarRank) / float64(totalEmployee) * 0.5,
			SimilarRankInterpolate: t.interpolate(float64(totalSimilarRank) / float64(totalEmployee) * 0.5),
			OOPRankValue:           float64(totalOOPRank) / float64(totalEmployee) * 1,
			OOPRankInterpolate:     t.interpolate(float64(totalOOPRank) / float64(totalEmployee) * 1),
			LeaderRankValue:        float64(totalLeaderRank) / float64(totalEmployee) * 0.5,
			LeaderRankInterpolate:  t.interpolate(float64(totalLeaderRank) / float64(totalEmployee) * 0.5),
			ActiveRankValue:        float64(totalActiveRank) / float64(totalEmployee) * 1,
			ActiveRankInterpolate:  t.interpolate(float64(totalActiveRank) / float64(totalEmployee) * 1),
		},
		Project: InterpolateProject{
			RequestStableValue:       float64(t.Project.RequestStableRank) * 2,
			RequestStableInterpolate: t.interpolate(float64(t.Project.RequestStableRank) * 2),
			PartTimeValue:            float64(t.Project.PartTimeRank) * -1,
			PartTimeInterpolate:      t.interpolate(float64(t.Project.PartTimeRank) * -1),
			HardLanguageValue:        float64(t.Project.HardLanguageRank) * -1,
			HardLanguageInterpolate:  t.interpolate(float64(t.Project.HardLanguageRank) * -1),
		},
	}
}

func (t Table7) CaculateEFW() float64 {
	var (
		EFW float64
		res = t.CalculateResult()
	)

	EFW += res.Employee.RUPRankValue
	EFW += res.Employee.SimilarRankValue
	EFW += res.Employee.OOPRankValue
	EFW += res.Employee.LeaderRankValue
	EFW += res.Employee.ActiveRankValue
	EFW += res.Project.RequestStableValue
	EFW += res.Project.PartTimeValue
	EFW += res.Project.HardLanguageValue

	return EFW
}

func (t Table7) CalculateEF() float64 {
	return 1.4 + (-0.03 * t.CaculateEFW())
}

func (t Table7) CalculateES() float64 {
	var (
		ES  float64
		res = t.CalculateResult()
	)
	ES += res.Employee.RUPRankInterpolate
	ES += res.Employee.SimilarRankInterpolate
	ES += res.Employee.OOPRankInterpolate
	ES += res.Employee.LeaderRankInterpolate
	ES += res.Employee.ActiveRankInterpolate
	ES += res.Project.RequestStableInterpolate
	ES += res.Project.PartTimeInterpolate
	ES += res.Project.HardLanguageInterpolate

	return ES
}

func (t Table7) CalculateP() float64 {
	var (
		ES = t.CalculateES()
	)
	switch {
	case ES >= 3:
		return 20
	case ES >= 1:
		return 32
	default:
		return 48
	}
}

type Record7Employee struct {
	ProjectUUID string `gorm:"Column:project_uuid; Type:Text"`
	ID          int    `gorm:"Column:id; primaryKey"`
	RUPRank     int    `gorm:"Column:rup_rank; Type:int"`
	SimilarRank int    `gorm:"Column:similar_rank; Type:int"`
	OOPRank     int    `gorm:"Column:oop_rank; Type:int"`
	LeaderRank  int    `gorm:"Column:leader_rank; Type:int"`
	ActiveRank  int    `gorm:"Column:active_rank; Type:int"`
}

type Record7Project struct {
	ProjectUUID       string `gorm:"Column:project_uuid; Type:Text; primaryKey"`
	RequestStableRank int    `gorm:"Column:request_stable_rank; Type:int"`
	PartTimeRank      int    `gorm:"Column:part_time_rank; Type:int"`
	HardLanguageRank  int    `gorm:"Column:hard_language_rank; Type:int"`
}

func (r *Record7Project) Update(requestStable, partTime, hardLang int) error {
	if !checkRecord7Rank(requestStable) {
		return errors.New("update - invalie requestStable rank")
	}
	if !checkRecord7Rank(partTime) {
		return errors.New("update - invalie partTime rank")
	}
	if !checkRecord7Rank(hardLang) {
		return errors.New("update - invalie hardLang rank")
	}

	r.RequestStableRank = requestStable
	r.PartTimeRank = partTime
	r.HardLanguageRank = hardLang

	return nil
}

func checkRecord7Rank(rank int) bool {
	return rank >= 0 && rank <= 5
}
