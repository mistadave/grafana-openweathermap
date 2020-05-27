import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './DataSource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { WeatherQuery, WeatherDataSourceOptions } from './types';

export const plugin = new DataSourcePlugin<DataSource, WeatherQuery, WeatherDataSourceOptions>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);
