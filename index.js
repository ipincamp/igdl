/**
 * @name igdl
 * @version v0.0.1
 * @author ipincamp <support@nur-arifin.my.id>
 * @license MIT
 */

import express from 'express';
import funcAPI from './src/events/api.js';
import funcGET from './src/events/get.js';
import funcREQ from './src/events/req.js';

const apps = express();
const port = process.env.PORT || 8000;

apps.use(express.static('./src/public'));

funcAPI(apps);
funcREQ(apps);
funcGET(apps);

apps.listen(port, () => console.info(`Listening server on port: ${port}`));
