const telAvivBounds = {
    north: 32.125,
    south: 32.030,
    west: 34.745,
    east: 34.840,
};

function getRandomTelAvivLocation(){
    const lat = Math.random() * (telAvivBounds.north - telAvivBounds.south) + 
        telAvivBounds.south;
    const lng = Math.random() * (telAvivBounds.east - telAvivBounds.west) +
        telAvivBounds.west;
    return { lat, lng };
}
