import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { WeatherDataSourceOptions } from './types';

const { SecretFormField, FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<WeatherDataSourceOptions> { }

interface State { }

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      path: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onLonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      lon: parseFloat(event.target.value),
    };
    onOptionsChange({ ...options, jsonData });
  };

  onLatChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      lat: parseFloat(event.target.value),
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      apiKey: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
        apiKey: '',
    };
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      jsonData,
    });
  };

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="Path"
            labelWidth={6}
            inputWidth={22}
            onChange={this.onPathChange}
            value={jsonData.path || 'api.openweathermap.org/data/2.5/weather'}
            placeholder="json field returned to frontend"
          />
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
              value={jsonData.apiKey || ''}
              label="API Key"
              placeholder="secure API Key"
              labelWidth={6}
              inputWidth={22}
              onReset={this.onResetAPIKey}
              onChange={this.onAPIKeyChange}
            />
          </div>
        </div>
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormField
              value={jsonData.lat || ''}
              label="Latitude"
              placeholder="Latitude of your default location"
              labelWidth={6}
              inputWidth={8}
              onChange={this.onLatChange}
            />
          </div>
          <div className="gf-form">
            <FormField
              value={jsonData.lon || ''}
              label="Longitude"
              placeholder="Longitude of your default location"
              labelWidth={6}
              inputWidth={8}
              onChange={this.onLonChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
