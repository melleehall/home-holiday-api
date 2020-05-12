function makeTripsArray() {
    return [
        {
            id: 1,
            trip_name: 'France',
            description: 'A trip to France!',
            element_one: 'Element one',
            sense_one: 'See',
            resource_one: 'Resource one',
            element_two: 'Element two',
            sense_two: 'Touch',
            resource_two: 'Resource two',
            element_three: 'Element three',
            sense_three: 'Taste',
            resource_three: 'Resource three',
            element_four: 'Element four',
            sense_four: 'Hear',
            resource_four: 'Resource four',
            element_five: 'Element five',
            sense_five: 'Smell',
            resource_five: 'Resource five',
            is_taken: false
        },
        {
            id: 2,
            trip_name: 'Underwater',
            description: 'A trip under the sea!',
            element_one: 'Great Barrier Reef',
            sense_one: 'See',
            resource_one: 'www.greatbr.com',
            element_two: 'Lush salt scrub',
            sense_two: 'Touch',
            resource_two: 'www.lushcosmetics.com/saltscrub',
            element_three: 'Miso soup',
            sense_three: 'Taste',
            resource_three: 'www.bestmiso.com',
            element_four: 'Sounds of the sea',
            sense_four: 'Hear',
            resource_four: 'www.soundsofthespeaspotify.com',
            element_five: 'Saltaire candle from Mer Sea',
            sense_five: 'Smell',
            resource_five: 'www.smellthiscandle.com',
            is_taken: false
        },
    ];
}

module.exports = {
    makeTripsArray,
  }