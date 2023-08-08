export default function selectIcon(weather) {
    const main = [800, 801, 802, 803, 804];
    const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    const shower_rain = [300, 301, 302, 310, 311, 312, 313, 314, 321];
    const rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531];
    const snow = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
    const mist = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];

    if(main.includes(weather.id)) {
        switch(weather.id) {
            case 800:
                return '/icons/weather_day/clear_sky.svg';
            case 801:
                return '/icons/weather_day/few_clouds.svg';
            case 802:
                return '/icons/weather_day/scattered_clouds.svg';
            default:
                return '/icons/weather_day/broken_clouds.svg';
        }
    }
    else if(thunderstorm.includes(weather.id)) {
        return '/icons/weather_day/thunderstorm.svg';
    }
    else if(shower_rain.includes(weather.id)) {
        return '/icons/weather_day/shower_rain.svg';
    }
    else if(rain.includes(weather.id)) {
        return '/icons/weather_day/rain.svg';
    }
    else if(snow.includes(weather.id)) {
        return '/icons/weather_day/snow.svg';
    }
    else if(mist.includes(weather.id)) {
        return '/icons/weather_day/mist.svg';
    }
    else {
        return '/icons/weather_day/few_clouds.svg';
    }
}