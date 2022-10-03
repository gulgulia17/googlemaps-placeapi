const app = require('express')()
const { init, getLocation, getDetails, getPostcodeByLatLng } = require("./lib");
const { getLong, getShort, array_unique } = require('./lib/helper');
const port = 3000

init('YourAPIKey')

/**
 * Get details
 * 
 * @param {string} input 
 */
async function get(input) {
    const place_details = [];
    const place = await getLocation({
        query: input
    })

    try {
        for (var i = 0; i < place.results?.length; i++) {
            try {
                const res = await getPostcodeByLatLng(place.results[i].geometry.location.lat, place.results[i].geometry.location.lng);
                const results = res?.results || []
                const addresses = []
                results.forEach(e => {
                    const city = getLong(e.address_components, 'administrative_area_level_2')
                    const state = getShort(e.address_components, 'administrative_area_level_1')
                    const postalcode = getLong(e.address_components, 'postal_code');
                    if (city && state && postalcode)
                        addresses.push(`${city}, ${state} - ${postalcode}`)
                });

                place_details.push(...array_unique(addresses))
            } catch (error) {
                console.log('error at 35',error);
            }
        }
    } catch (error) {
        console.log('error at 39', error);
    }

    return array_unique(place_details).sort()
}

app.get('/', async (req, res) => {
    const body = req.query

    if (!body.input) {
        res.status(400).json({ status: false, messgae: 'Required fields not present.' })
        res.end()
        return
    }

    res.json(await get(body.input))
    res.end()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})