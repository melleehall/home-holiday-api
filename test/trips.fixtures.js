function makeTripsArray() {
    return [
        {
            id: 1,
            trip_name: 'France',
            description: 'A trip to France!',
            element_one: 'Element one',
            sense_one: 'See',
            element_two: 'Element two',
            sense_two: 'Touch',
            element_three: 'Element three',
            sense_three: 'Taste',
            element_four: 'Element four',
            sense_four: 'Hear',
            element_five: 'Element five',
            sense_five: 'Smell',
        },
        {
            id: 2,
            trip_name: 'Underwater',
            description: 'A trip under the sea!',
            element_one: 'Great Barrier Reef',
            sense_one: 'See',
            element_two: 'Lush salt scrub',
            sense_two: 'Touch',
            element_three: 'Miso soup',
            sense_three: 'Taste',
            element_four: 'Sounds of the sea',
            sense_four: 'Hear',
            element_five: 'Saltaire candle from Mer Sea',
            sense_five: 'Smell',
        },
    ];
}

module.exports = {
    makeTripsArray,
  }