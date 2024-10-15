import { Injectable, Signal, signal } from '@angular/core';
import { IChartConfiguration } from '../interfaces/chartly.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  private _chartConfigurations = signal<IChartConfiguration[]>([]);

  get chartConfigurations(): Signal<IChartConfiguration[]> {
    return this._chartConfigurations.asReadonly();
  }

  addConfiguration(config: IChartConfiguration): Promise<void> {
    return new Promise((resolve) => {
      this._chartConfigurations.update(configs => [...configs, config]);
      resolve();
    });
  }

  updateConfiguration(id: number, config: IChartConfiguration): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this._chartConfigurations().findIndex(cfg => cfg.id === id);

      if (index === -1) {
        reject(new Error('Configuration with the given ID not found'));
        return;
      }

      this._chartConfigurations.update(configs => {
        const newConfigs = [...configs];
        newConfigs[index] = config;
        return newConfigs;
      });

      resolve();
    });
  }

  removeConfiguration(index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (index < 0 || index >= this._chartConfigurations().length) {
        reject(new Error('Invalid index'));
        return;
      }
      this._chartConfigurations.update(configs => configs.filter((_, i) => i !== index));
      resolve();
    });
  }

  clearConfigurations(): Promise<void> {
    return new Promise((resolve) => {
      this._chartConfigurations.set([]);
      resolve();
    });
  }

  getConfigurationByIndex(index: number): Promise<IChartConfiguration> {
    return new Promise((resolve, reject) => {
      const configs = this._chartConfigurations();
      if (index < 0 || index >= configs.length) {
        reject(new Error('Invalid index'));
        return;
      }
      resolve(configs[index]);
    });
  }

  getAllConfigurations(): Promise<IChartConfiguration[]> {
    return Promise.resolve(this._chartConfigurations());
  }

}
