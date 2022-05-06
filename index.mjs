import db from './models/index.mjs';

if (process.argv[2] === 'create') {
  db.Trip.create({
    name: process.argv[3],
  })
    .then((trip) => {
      console.log('success!');
      console.log(trip);
    })
    .catch((error) => console.log(error));
} else if (process.argv[2] === 'add-attrac') {

  try {
    const trip = await db.Trip.findOne({
      where: {
        name: process.argv[3],
      },
    });

    const category = await db.Category.findOne({
      where: {
        name: process.argv[5],
      },
    });

    const attraction = await db.Attraction.create({
      name: process.argv[4],
      trip_id: trip.id,
      category_id: category.id,
    });

    console.log('success!');
    console.log(attraction);

  } catch (error) { console.log(error) };
} else if (process.argv[2] === 'trip') {
  db.Trip.findOne({
    where: {
      name: process.argv[3],
    },
  })
    .then((trip) => {
      return db.Attraction.findAll({
        where: {
          trip_id: trip.id,
        },        
      })
    })
    .then((attraction) => {
      console.log('success!');
      console.log(attraction);
    })
    .catch((error) => console.log(error));  
} else if (process.argv[2] === 'add-category') {
  db.Category.create({
    name: process.argv[3],
  })
    .then((category) => {
      console.log('success!');
      console.log(category);
    })
    .catch((error) => console.log(error));
} else if (process.argv[2] === 'category-trip') {
  try {
    const trip = await db.Trip.findOne({
      where: {
        name: process.argv[3],
      },
    });

    const category = await db.Category.findOne({
      where: {
        name: process.argv[4],
      },
    });

    const attraction = await db.Attraction.findAll({
      where: {
        trip_id: trip.id,
        category_id: category.id,
      },
    });

    console.log('success!');
    console.log(attraction);

  } catch (error) { console.log(error) };  
} else if (process.argv[2] === 'category-attractions') {
  try {
    const category = await db.Category.findOne({
      where: {
        name: process.argv[3],
      },
    });

    const attraction = await db.Attraction.findAll({
      where: {
        category_id: category.id,
      },
    });

    console.log('success!');
    console.log(attraction);

  } catch (error) { console.log(error) };  
}