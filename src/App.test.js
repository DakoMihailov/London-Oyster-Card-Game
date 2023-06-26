  let stations = [{"name": "Holborn"},
    {"name": "Earl’s Court"},
    {"name": "Wimbledon"},
    {"name": "Hammersmith"},
    {"name": "Chelsea"},];

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

  const calculateFare = (startStation, destinationStation, transportType, startBalance) => {
      let startingZone = getZone(startStation.name);
      let endZone = getZone(destinationStation.name);
      let fare;

      if (transportType === 'tube') {
          fare = getFare(startingZone, endZone);
      } else if (transportType === 'bus') {
          fare = 1.80;
      } else {
          fare = 0;
      }
      return startBalance + 3.2 - fare;
  }

  const maxFare = (balance) => {
      return balance - 3.2;;
  }

  test('case 1: Tube Holborn to Earl’s Court', () => {
    //Fare case 1 cuz Holborn and Earl’s Court are located in Zone 1
    let startStation = stations[0];
    let destinationStation = stations[1];
    const transportType = 'tube';
    let startBalance = maxFare(30);
    let destinationBalance = calculateFare(startStation, destinationStation, transportType, startBalance);
    expect(startBalance).toBe(26.8);
    expect(destinationBalance).toBe(27.5);
  });

  test('case 2: 328 bus from Earl’s Court to Chelsea', () => {
    //Fare case 6 cuz bus fares are equal
    let startStation = stations[1];
    let destinationStation = stations[4];
    const transportType = 'bus';
    let startBalance = maxFare(30);
    let destinationBalance = calculateFare(startStation, destinationStation, transportType, startBalance);
    expect(startBalance).toBe(26.8);
    expect(destinationBalance).toBe(28.2);
  });

  test('case 3: Tube Earl’s court to Hammersmith', () => {
    //Fare case 2 cuz Earl’s court is located in Zone 1, 2 and Hammersmith is located in Zone 2
    let startStation = stations[1];
    let destinationStation = stations[3];
    const transportType = 'tube';
    let startBalance = maxFare(30);
    let destinationBalance = calculateFare(startStation, destinationStation, transportType, startBalance);
    expect(startBalance).toBe(26.8);
    expect(destinationBalance).toBe(28);
  });