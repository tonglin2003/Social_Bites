### Step to setup a backend
1. inside the terminal enter the folling:
```
npm install express
npm install nodemon
npm install pg
npm install dotenv
npm install --save sequelize sequelize-cli pg-hstore
npx sequelize-cli init
npm install bcryptjs
```

2. Create your database for the project
    a. enter `psql` to login into your postgresSQL superuser
    b. enter `CREATE DATABASE <db_name>;`
    c. then enter `\q` to close the super user

3. Create your `.env` file in the following format:
```
DB_USER=<user you are using>
DB_HOST=localhost
DB_NAME=<The database name you are using for your app>
DB_PASSWORD=<your password for the user>
DB_PORT=5432

```

4. Run the following command in the terminal:
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

```

note: if you need to undo the migration and seeder, use the following command
```
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:seed:undo:all
```


### update to set up session!
1. enter the following into your terminal:
```
npm install express-session
npm install cors
```

2. Get your session secret, enter `node` and hit `enter` and type in:
```
require("crypto").randomBytes(64).toString("hex")
```
Copy the given string

3. Inside your `.env` add:
```
SESSION_SECRET=<generated_session_secret_given>
```

4. API Endpoint postman api:
https://gold-equinox-29662.postman.co/workspace/Social-Bite~b22e44a7-7d14-4492-80ae-7bfb3a663638/collection/25222511-e86e4265-f483-47f8-bb47-eab065163c7a?action=share&creator=25222511
Here, you can get an example of each api request


#### update for fetching nearby restaurant
1. login into your postgres super user, in the terminal: 
```
psql -U postgres -d <database_name>
```
then enter your password

2. enter:
```
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
```

3. try fetching for nearby restaurants by running, `<localhost_PORT_LINK>/api/user/nearby_restaurant/5` in the postman api shareed linked with this README.md


#### UPDATE for google map api
1. terminal: `npm install axios`

2. get Google Map API key
    a. Go to the link: `https://console.cloud.google.com/`
    b. Login into your account, then create a new project on the navbar
    c. Open "API&Service" and create credential, they might ask you to enter your information like credit card, but they won't charge you until you open auto bill
    d. then copy the API KEY 

3. Inside your `.env` file add a new row
```
GOOGLE_API_KEY=<YOUR GOOGLE MAP API KEY>
```
this will be used as API Key to have access to google map api, there is an example on `backend/routes/restaurant.js`

4. (Optional) To test out if everything is working fine, go to Postman API and run `post restaurant` request located inside the `restaurant` folder.
should update the restaurant table inside the database and return
```
{
    "message": "The restaurant is created successfully",
    "restaurant": {
        "restaurant": "Mangia 57th - Midtown Italian Food & Corporate Catering NYC"
    }
}
```