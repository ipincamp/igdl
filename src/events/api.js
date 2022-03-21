/**
 * @name igdl
 * @version v0.0.1
 * @author ipincamp <support@nur-arifin.my.id>
 * @license MIT
 */

import axios from 'axios';
import { Joi, validate } from 'express-validation';

/**
 *
 * @param {import('express').Application} apps
 */
export default function funcAPI(apps) {
  apps.get(
    '/api',
    validate({
      query: Joi.object({
        url: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const { url } = req.query;

      await axios({
        method: 'get',
        url,
      }).then((meta) => {
        const resp = meta.data.graphql.shortcode_media;

        res.json(resp);
      }).catch((err) => next(err));
    },
  );
}
