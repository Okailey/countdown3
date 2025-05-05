export const getWeatherColor = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return '#f7b733'; // sunny yellow-orange
        case 'clouds':
            return '#2b3e50'; // cloudy blue-gray
        case 'rain':
            return '#1f2f46'; // rainy dark blue
        case 'snow':
            return '#b3d9ff'; // light blue
        case 'thunderstorm':
            return '#4e4376'; // dark purple
        case 'drizzle':
            return '#89a4c7'; // light gray-blue
        case 'mist':
        case 'fog':
            return '#aaa'; // gray
        default:
            return '#2b3e50'; // fallback dark blue
    }
};



