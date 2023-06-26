import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { RadioButton } from 'primereact/radiobutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

function App() {
    
    let stations = [{"name": "Holborn"},
    {"name": "Earl’s Court"},
    {"name": "Wimbledon"},
    {"name": "Hammersmith"},
    {"name": "Chelsea"},];
    
    const [balance, setBalance] = useState(30);
    const [transportType, setTransportType] = useState(null);
    const [startStation, setStartStation] = useState(null);
    const [destinationStation, setDestinationStation] = useState(null);
    const [filteredStations, setFilteredStations] = useState(null);

    const getZone = (station) => {

        let zone;

        switch (station) {
            case 'Holborn':
                zone = 1;
                break;
            case 'Earl’s Court':
                zone = [1, 2];
                break;
            case 'Wimbledon':
                zone = 3;
                break;
            case 'Hammersmith':
                zone = 2;
                break;
            case 'Chelsea':
                zone = 4;
                break;
            default :
                break;
        }
        return zone;
    }
    const getFare = (startingZone, endZone) => {

        console.log(startingZone);
        console.log(endZone);

        if (Array.isArray(startingZone) || Array.isArray(endZone)) {
            if (Array.isArray(startingZone)) {

                let fairArray = startingZone.map(item => {
                    if (item === 1 && endZone === 1) {
                        return 2.50;
                    } else if (item !== 1 && item === endZone) {
                        return 2.00;
                    } else if (item === 1 || endZone === 1) {
                        return 3.00;
                    } else if (item !== endZone && item !== 1 && endZone !== 1) {
                        return 2.25;
                    }
                });

                // Returning the lowest fair

                return Math.min(...fairArray);

            } else {
                let fairArray = endZone.map(item => {
                    if (startingZone === 1 && item === 1) {
                        return 2.50;
                    } else if (startingZone !== 1 && startingZone === item) {
                        return 2.00;
                    } else if (startingZone === 1 || item === 1) {
                        return 3.00;
                    } else if (startingZone !== item && startingZone !== 1 && item !== 1) {
                        return 2.25;
                    }
                });

                // Returning the lowest fair
                return Math.min(...fairArray);
            }
        } else {
            if (startingZone === 1 && endZone === 1) {
                return 2.50;
            } else if (startingZone !== 1 && startingZone === endZone) {
                return 2.00;
            } else if (startingZone === 1 || endZone === 1) {
                return 3.00;
            } else if (startingZone !== endZone && startingZone !== 1 && endZone !== 1) {
                return 2.25;
            }
        }
    }

    const calculateFare = () => {
        let startingZone = getZone(startStation.name);
        let endZone = getZone(destinationStation.name);
        let fare;

        if (transportType === 'tube') {
            fare = getFare(startingZone, endZone);

            console.log('------fare');
            console.log(fare);
        } else if (transportType === 'bus') {
            fare = 1.80;
        } else {
            fare = 0;
        }
        setBalance((balance + 3.20) - fare);

    }

    const maxFare = () => {
        setBalance(balance - 3.20);
    }


    const searchStation = (event) => {
        setTimeout(() => {
            let _filteredStation;
            if (!event.query.trim().length) {
                _filteredStation = [...stations];
            } else {
                _filteredStation = stations.filter((station) => {
                    return station.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredStations(_filteredStation);
        }, 250);
    }

    const itemTemplate = (item) => {
        return (
            <div className="country-item">
                <div>{item.name}</div>
            </div>
        );
    }

    return (
        <div className="App">
            <br /><br />
            <h1>Oyster Card Balance : £ <span style={{ color: '#2196F3' }}>{balance}</span></h1>
            <br />
            <div className="radio_outer">
                <div className="radio_wrap" data-testid="tubeRadioButton">
                    <RadioButton value="tube" name="type" onChange={(e) => setTransportType(e.value)}
                        checked={transportType === 'tube'} />
                    <p>Tube</p>
                </div>
                <div className="radio_wrap" data-testid="busRadioButton">
                    <RadioButton value="bus" name="type" onChange={(e) => setTransportType(e.value)}
                        checked={transportType === 'bus'} />
                    <p>Bus</p>
                </div>
            </div>

            <div className="select-station">
                <div>
                    <h4>Starting Station</h4>
                    <br />
                    <AutoComplete value={startStation} suggestions={filteredStations} completeMethod={searchStation}
                        field="name" dropdown forceSelection itemTemplate={itemTemplate}
                        onChange={(e) => setStartStation(e.value)} />
                </div>
                <div>
                    <h4>Destination Station</h4>
                    <br />
                    <AutoComplete value={destinationStation} suggestions={filteredStations}
                        completeMethod={searchStation}
                        field="name" dropdown forceSelection itemTemplate={itemTemplate}
                        onChange={(e) => setDestinationStation(e.value)} />
                </div>
            </div>
            <div className="buttons-custom">
                <Button type="button" label='Enter Station' onClick={maxFare} icon="pi pi-check" className="p-ml-2 m-r-50"></Button>
                <Button type="button" label='Exit Station' onClick={calculateFare} icon="pi pi-check" className="p-ml-2"></Button>
            </div>
        </div>
    );
}

export default App;
