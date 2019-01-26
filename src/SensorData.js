import React from 'react';
import cx from 'classnames';
import { format } from 'date-fns';

function SensorData({
  sensorId,
  sensorType,
  location,
  timestamp,
  sensorDataValues,
}) {
  return (
    <div
      className={cx(
        'flex flex-col bg-white max-w-sm shadow-lg rounded-lg overflow-hidden mb-4 p-5',
        { 'border-black border-4': sensorId === 93 }
      )}
    >
      <div className="flex flex-row justify-between">
        <span className="text-sm text-grey-dark uppercase">
          <span className="font-bold">{`#${sensorId}`}</span> {sensorType}
        </span>
        <span className="text-sm text-grey-dark">
          {format(timestamp, 'hh:mm a')}
        </span>
      </div>
      <div className="text-sm text-grey-dark pt-2">{location}</div>
      <div className="flex flex-row flex-wrap justify-between">
        {sensorDataValues.map(sensordata => {
          const value = sensordata.value;
          let unit = '';

          switch (sensordata.value_type) {
            case 'P1':
              unit = 'PM10';
              break;
            case 'P2':
              unit = 'PM2.5';
              break;
            case 'humidity':
              unit = 'hum';
              break;
            case 'temperature':
              unit = 'temp';
              break;
            case 'hdop':
              unit = 'hdop';
              break;
            case 'ratioP2':
              unit = 'ratioP2';
              break;
            case 'durP2':
              unit = 'durP2';
              break;
            case 'ratioP1':
              unit = 'ratioP1';
              break;
            case 'durP1':
              unit = 'durP1';
              break;
            default:
              break;
          }

          return (
            <div key={sensordata.id} className="w-48 py-3">
              <span className="text-4xl">
                {Number.parseFloat(value).toFixed(2)}
              </span>
              <span className="text-xl">{unit}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SensorData;
