/**
 * @name igdl
 * @version v0.0.1
 * @author ipincamp <support@nur-arifin.my.id>
 * @license MIT
 */

import axios from 'axios';
import https from 'https';
import { Joi, validate } from 'express-validation';

/**
 *
 * @param {import("express").Application} apps
 */
export default function funcGET(apps) {
  apps.get(
    '/get',
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
        const metaData = meta.data.graphql.shortcode_media;
        const mediaType = metaData.is_video;

        if (mediaType === true) {
          https.get(metaData.video_url, (v) => {
            res.setHeader('Content-Disposition', `attachment; filename="igdl-${metaData.owner.username}_${metaData.shortcode}.mp4"`);
            res.setHeader('Content-Type', 'video/mp4');

            v.pipe(res);
          });
        } else {
          https.get(metaData.display_url, (v) => {
            res.setHeader('Content-Disposition', `attachment; filename="igdl-${metaData.owner.username}_${metaData.shortcode}.jpg"`);
            res.setHeader('Content-Type', 'image/jpeg');

            v.pipe(res);
          });
        }
      }).catch((err) => next(err));
    },
  );
}
