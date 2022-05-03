import connectDb from "./connectDb.js";

export const addRestaurant = async (req,res) => {
    // check if request is valid
    if (!req.body|| !req.body.name || !req.body.address) {
        res.status(401).send('Invalid request');
        return;
    }
    // connect to Firestore
    const db = connectDb();
    // prepare the data
const newRestaurant = {
    name: req.body.name,
    address: req.body.address,
    rating: req.body.rating || 3,
    cuisine: req.body.cuisine || 'American',
}
    // add data to the restaurants collection
    try{
    const doc = await db.collection('restaurants').add(newRestaurant);
    // respond with success
    res.status(201).send('Restaurant created' + doc.id);
    } catch (err){
    // respond with error
    res.status(500).send(err);
    }
}
export const getAllRestaurants = async (req, res) => {
    const db = connectDb();
    try{
        const snapshot = db.collection('restaurants').get();
        const restaurantArray = snapshot.docs.map(doc => {
            let restaurant = doc.data();
            restaurant.id = doc.id;
            return restaurant;
        })
        res.send(restaurantArray);

    }   catch (err) {
    res.status(500).send(err);
    }
}
