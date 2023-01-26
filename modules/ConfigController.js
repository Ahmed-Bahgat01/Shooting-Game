import jsonConfigs from '../configs/configs.json' assert { type: 'json' };

export class ConfigController {
  constructor(level = 1) {
    this.configs = Object.assign(
      jsonConfigs[level],
      jsonConfigs[0] // defaults
    );
  }
}
