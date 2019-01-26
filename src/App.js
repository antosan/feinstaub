import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: [],
      sensorId: 93,
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
        'http://api.airquality.codeforafrica.org/v1/now/'
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

      // Sort results by sensor ID
      results.sort((a, b) => a.sensorId - b.sensorId);

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

    try {
      const response = await axios.get(NOMINATIM_URL);

      return response.data.display_name;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  render() {
    const { sensorData } = this.state;

    return (
      <div className="container mx-auto">
        <div>
          {sensorData.map(data => (
            <span key={data.id} className="max-w-sm shadow-lg mb-8">
              {`Sensor ${data.sensorId}: ${format(
                data.timestamp,
                'hh:mm a'
              )} - ${data.location}`}
              <div className="text-sm text-grey-darker mb-4">
                {data.sensorDataValues.map(sensordata => (
                  <span key={sensordata.id} className="block">
                    {`${sensordata.value_type}: ${sensordata.value}`}
                  </span>
                ))}
              </div>
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
