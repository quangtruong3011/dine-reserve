import express from 'express';
import "dotenv/config";
import sequelize from './configs/db.config';
import errorMiddleware from './middlewares/error.middleware';
import router from './routers';
import { corsMiddleware } from './middlewares/cors.middleware';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(corsMiddleware);
app.use(cors({ origin: '*' }));
app.use(errorMiddleware);

app.use('/api', router);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});

// sequelize.sync({ alter: true }).then(() => {
//     app.listen(PORT, () => {
//         console.log(`App is running on http://localhost:${PORT}`);
//     });
// }).catch((error) => {
//     console.error("Unable to connect to the database:", error);
// });
