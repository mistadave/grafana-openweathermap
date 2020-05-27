import defaults from 'lodash/defaults';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { WeatherQuery, WeatherDataSourceOptions, defaultQuery } from './types';

export class DataSource extends DataSourceApi<WeatherQuery, WeatherDataSourceOptions> {
  apiKey: string;
  apiUrl: string;
  lat: number;
  lon: number;

  constructor(instanceSettings: DataSourceInstanceSettings<WeatherDataSourceOptions>) {
    super(instanceSettings);
    this.apiKey = instanceSettings.jsonData.apiKey;
    this.apiUrl = instanceSettings.jsonData.path;
    this.lat = instanceSettings.jsonData.lat;
    this.lon = instanceSettings.jsonData.lon;
  }

  async query(options: DataQueryRequest<WeatherQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range!.from.valueOf();
    const to = range!.to.valueOf();
    const duration = to - from;
    const step = duration / 1000;
    console.log(`${this.apiKey} | url: ${this.apiUrl}`);

    // Return a constant for each query.
    const data = options.targets.map(target => {
      const query = defaults(target, defaultQuery);
      const frame = new MutableDataFrame({
        refId: query.refId,
        fields: [
          //{ name: 'time', values: [from, to], type: FieldType.time },
          { name: 'time', type: FieldType.time },
          //{ name: 'value', values: [query.constant, query.constant], type: FieldType.number },
          { name: 'value', type: FieldType.number},
        ],
      });
      for (let t = 0; t < duration; t += step) {
        frame.add({ time: from + t, value: Math.sin((2 * Math.PI * t) / duration) });
      }
      return frame;
    });

    return { data };
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
