import React from 'react';
import axios from 'axios';
import memoize from 'memoize-async';
import SensorData from './SensorData';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: [],
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

      let results = response.data.map(async data => ({
        id: data.id,
        sensorId: data.sensor.id,
        sensorType: data.sensor.sensor_type.name,
        location: await this.nominatimGeocoder(
          data.location.latitude,
          data.location.longitude
        ),
        timestamp: data.timestamp,
        sensorDataValues: data.sensordatavalues,
      }));

      results = await Promise.all(results);

      // sort results by timestamp - descending (newer results first)
      results.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      // Sort results by sensor ID - descending order
      results.sort((a, b) => b.sensorId - a.sensorId);

      // Get latest value for each sensor
      const sensorData = [];
      const sensorIds = [];

      results.forEach(res => {
        if (!sensorIds.includes(res.sensorId)) {
          sensorData.push(res);
          sensorIds.push(res.sensorId);
        }
      });

      this.setState({ sensorData });
    } catch (error) {
      console.error(error);
      this.setState({ sensorData: [] });
    }
  }

  async nominatimGeocoder(latitude, longitude) {
    const NOMINATIM_URL = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&limit=1&lat=${latitude}&lon=${longitude}`;
    const memFetch = memoize(this.fn);

    try {
      const response = await memFetch(NOMINATIM_URL);

      return response ? response.display_name : '';
    } catch (error) {
      console.error('nominatimGeocoder error -> ', error);
      return '';
    }
  }

  fn(url) {
    axios.get(url).then(res => res.data);
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
