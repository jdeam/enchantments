const axios = require('axios');

const API_URL = 'https://www.recreation.gov/api/permits/233273/availability/month?start_date=2021-09-01T00:00:00.000Z&commercial_acct=false&is_lottery=false';

const getAvailableDates = async () => {
    const { data } = await axios.get(API_URL);

    const availabilityInfo = data
        .payload
        .availability
        ?.['30']
        .quota_type_maps
        .QuotaUsageByMember;
        
    const availableDates = Object.entries(availabilityInfo)
        .filter(([, { remaining }]) => remaining >= 2)
        .map(([date]) => date.replace(/T00:00:00Z/g, ''));

    return availableDates;
};

module.exports = getAvailableDates;
