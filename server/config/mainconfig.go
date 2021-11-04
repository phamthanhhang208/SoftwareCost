package config

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/pkg/errors"
	"github.com/spf13/viper"
)

var (
	mainCfg = new(MainConfig)
)

type MainConfig struct {
	DB   DatabaseConfig   `mapstructure:"Database"`
	HTTP HTTPServerConfig `mapstructure:"HTTP"`
}

func Get() *MainConfig {
	return mainCfg
}

var (
	ErrInvalidFormat = errors.New("invalid filepath, must .../<name>.<ext>")
	ErrNilExpected   = errors.New("nil expected")
)

func Set(name string) error {
	file := filepath.Base(name)

	// 0: filename, 1: file ext
	fileSl := strings.Split(file, ".")
	if len(fileSl) != 2 {
		return ErrInvalidFormat
	}

	// read the config file using viper
	v := viper.New()
	v.SetConfigName(fileSl[0])
	v.SetConfigType(fileSl[1])
	v.AddConfigPath(".")     // current folder
	v.AddConfigPath("..")    // depth 1 - test file
	v.AddConfigPath("../..") // depth 2 - test file

	if err := v.ReadInConfig(); err != nil {
		return errors.WithMessage(err, "read config")
	}

	if err := v.Unmarshal(mainCfg); err != nil {
		return errors.WithMessage(err, "unmarshal")
	}

	dbHost := os.Getenv("DB_HOST")
	if len(dbHost) > 0 {
		mainCfg.DB.Host = dbHost
	}

	return nil
}
