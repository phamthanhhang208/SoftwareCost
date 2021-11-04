package entity

import "errors"

type Table5 struct {
	ProjectUUID         string `gorm:"Column:project_uuid; Type:text; primaryKey"`
	DistributedRank     int    `gorm:"Column:distributed_rank; Type:int"`
	InstantRank         int    `gorm:"Column:instant_rank; Type:int"`
	OnlineRank          int    `gorm:"Column:online_rank; Type:int"`
	ComplexityRank      int    `gorm:"Column:complexity_rank; Type:int"`
	ReusableRank        int    `gorm:"Column:reuseable_rank; Type:int"`
	EasyInstallRank     int    `gorm:"Column:easy_install_rank; Type:int"`
	EasyUseRank         int    `gorm:"Column:easy_use_rank; Type:int"`
	ConvertableRank     int    `gorm:"Column:convertable_rank; Type:int"`
	EasyConvertRank     int    `gorm:"Column:easy_convert_rank; Type:int"`
	ConcurrencyRank     int    `gorm:"Column:concurrency_rank; Type:int"`
	SpecialSecurityRank int    `gorm:"Column:special_security_rank; Type:int"`
	Direct3rdPartyRank  int    `gorm:"Column:direct_3rd_party_rank; Type:int"`
	SpecialTrainingRank int    `gorm:"Column:special_training_rank; Type:int"`
}

func (t Table5) CalculateTFW() float64 {
	var TFW float64

	TFW += 2 * float64(t.DistributedRank)
	TFW += 1 * float64(t.InstantRank)
	TFW += 1 * float64(t.OnlineRank)
	TFW += 1 * float64(t.ComplexityRank)
	TFW += 1 * float64(t.ReusableRank)
	TFW += 0.5 * float64(t.EasyInstallRank)
	TFW += 0.5 * float64(t.EasyUseRank)
	TFW += 2 * float64(t.ConvertableRank)
	TFW += 1 * float64(t.EasyConvertRank)
	TFW += 1 * float64(t.ConcurrencyRank)
	TFW += 1 * float64(t.SpecialSecurityRank)
	TFW += 1 * float64(t.Direct3rdPartyRank)
	TFW += 1 * float64(t.SpecialTrainingRank)

	return TFW
}

func (t Table5) CalculateTCF() float64 {
	return 0.6 + 0.01*t.CalculateTFW()
}

func checkTable5Rank(rank int) bool {
	return rank >= 0 && rank <= 5
}

type UpdateTable5Spec struct {
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

func (t *Table5) Update(spec UpdateTable5Spec) error {
	if !checkTable5Rank(spec.DistributedRank) {
		return errors.New("invalid DistributedRank")
	}

	if !checkTable5Rank(spec.InstantRank) {
		return errors.New("invalid InstantRank")
	}
	if !checkTable5Rank(spec.OnlineRank) {
		return errors.New("invalid OnlineRank")
	}
	if !checkTable5Rank(spec.ComplexityRank) {
		return errors.New("invalid ComplexityRank")
	}
	if !checkTable5Rank(spec.ReusableRank) {
		return errors.New("invalid ReusableRank")
	}
	if !checkTable5Rank(spec.EasyInstallRank) {
		return errors.New("invalid EasyInstallRank")
	}
	if !checkTable5Rank(spec.EasyUseRank) {
		return errors.New("invalid EasyUseRank")
	}
	if !checkTable5Rank(spec.ConvertableRank) {
		return errors.New("invalid ConvertableRank")
	}
	if !checkTable5Rank(spec.EasyConvertRank) {
		return errors.New("invalid EasyConvertRank")
	}
	if !checkTable5Rank(spec.ConcurrencyRank) {
		return errors.New("invalid ConcurrencyRank")
	}
	if !checkTable5Rank(spec.SpecialSecurityRank) {
		return errors.New("invalid SpecialSecurityRank")
	}
	if !checkTable5Rank(spec.Direct3rdPartyRank) {
		return errors.New("invalid Direct3rdPartyRank")
	}
	if !checkTable5Rank(spec.SpecialTrainingRank) {
		return errors.New("invalid SpecialTrainingRank")
	}

	t.SpecialTrainingRank = spec.SpecialTrainingRank
	t.DistributedRank = spec.DistributedRank
	t.InstantRank = spec.InstantRank
	t.OnlineRank = spec.OnlineRank
	t.ComplexityRank = spec.ComplexityRank
	t.ReusableRank = spec.ReusableRank
	t.EasyInstallRank = spec.EasyInstallRank
	t.EasyUseRank = spec.EasyUseRank
	t.ConvertableRank = spec.ConvertableRank
	t.EasyConvertRank = spec.EasyConvertRank
	t.ConcurrencyRank = spec.ConcurrencyRank
	t.SpecialSecurityRank = spec.SpecialSecurityRank
	t.Direct3rdPartyRank = spec.Direct3rdPartyRank

	return nil
}
