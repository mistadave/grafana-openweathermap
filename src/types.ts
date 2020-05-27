import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface WeatherQuery extends DataQuery {
  queryText?: string;
  constant: number;
  frequency: number;
  lat: number;
  lon: number;
}

export const defaultQuery: Partial<WeatherQuery> = {
  constant: 6.5,
  frequency: 1.0,
};

/**
 * These are options configured for each DataSource instance
 */
export interface WeatherDataSourceOptions extends DataSourceJsonData {
  path: string;
  apiKey: string;
  lat: number;
  lon: number;
  zip?: number;
  country: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface WeatherSecureJsonData {
  apiKey?: string;
}
