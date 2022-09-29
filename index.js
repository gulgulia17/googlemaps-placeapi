const app = require('express')()
const { init, getLocation, getDetails } = require("./lib");

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
    
    for (var i = 0; i < place.results?.length; i++) {
        place_details[i] = await getDetails(place.results[i].place_id);
    }

    return place_details;
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