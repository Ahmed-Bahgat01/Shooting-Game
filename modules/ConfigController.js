import jsonConfigs from '../configs/configs.json' assert { type: 'json' };
// import defaults from '../configs/defaults.json' assert { type: 'json' };

export class ConfigController {
  constructor(level = 1) {
    // let temp = defaults;
    // console.log(temp);
    this.configs = Object.assign(
      jsonConfigs[level],
      jsonConfigs[0] // defaults
    );
  }
}
