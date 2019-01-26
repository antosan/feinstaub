import React from 'react';
import axios from 'axios';
import SensorData from './SensorData';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: [],
      sensorLocations: {},
    };

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();

    this.intervalId = setInterval(this.fetch, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  async fetch() {
    try {
      const response = await axios.get(
        'https://api.airquality.codeforafrica.org/v1/now/'
      );
      const results = response.data;

      // sort results by timestamp - descending (newer results first)
      results.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      // Sort results by sensor ID - descending order
      results.sort((a, b) => b.sensor.id - a.sensor.id);

      // Get latest value for each sensor
      const filteredResults = [];
      const sensorIds = [];

      results.forEach(res => {
        if (!sensorIds.includes(res.sensor.id)) {
          filteredResults.push(res);
          sensorIds.push(res.sensor.id);
        }
      });

      let sensorData = filteredResults.map(async data => {
        const latLon =
          String(data.location.latitude) + String(data.location.longitude);
        const { sensorLocations } = this.state;
        let location;

        if (sensorLocations[latLon]) {
          location = sensorLocations[latLon];
        } else {
          location = await this.nominatimGeocoder(
            data.location.latitude,
            data.location.longitude
          );
          sensorLocations[latLon] = location;
          this.setState({ sensorLocations });
        }

        return {
          id: data.id,
          sensorId: data.sensor.id,
          sensorType: data.sensor.sensor_type.name,
          location,
          timestamp: data.timestamp,
          sensorDataValues: data.sensordatavalues,
        };
      });

      sensorData = await Promise.all(sensorData);

      this.setState({ sensorData });
    } catch (error) {
      console.error(error);
      this.setState({ sensorData: [] });
    }
  }

  async nominatimGeocoder(latitude, longitude) {
    const NOMINATIM_URL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&limit=1&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await axios.get(NOMINATIM_URL);

      return response.data.display_name;
    } catch (error) {
      console.error('nominatimGeocoder error -> ', error);
      return '';
    }
  }

  render() {
    const { sensorData } = this.state;

    return (
      <div className="container mx-auto px-4 py-4">
        <div className="text-5xl text-center m-4">
          <span>{sensorData.length}</span>
          <span className="text-2xl">sensors</span>
        </div>
        <div className="flex flex-row flex-wrap justify-between">
          {sensorData.map(data => {
            const {
              id,
              sensorId,
              sensorType,
              location,
              timestamp,
              sensorDataValues,
            } = data;

            return (
              <SensorData
                key={id}
                sensorId={sensorId}
                sensorType={sensorType}
                location={location}
                timestamp={timestamp}
                sensorDataValues={sensorDataValues}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
