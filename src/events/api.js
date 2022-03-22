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
 * @param {string} url
 */
function urls(url) {
  let newURL;

  if (url.length === 11) {
    newURL = `https://www.instagram.com/p/${url}/?__a=1`;
  } else if (url.includes('instagram.com')) {
    const a = url.split('?utm')[0];
    newURL = `${a}?__a=1`;
  }

  return newURL;
}

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
      const newURL = urls(url);

      await axios({
        method: 'get',
        url: newURL,
      }).then((meta) => {
        const metaInfo = meta.data.graphql.shortcode_media;

        if (metaInfo.__typename == 'GraphSidecar') {
          res.send('Collage image not supported :(');
        } else {
          const {
            display_resources,
            display_url,
            edge_media_preview_like,
            owner,
            video_url,
          } = metaInfo;

          const likes = edge_media_preview_like.count;

          const {
            edge_followed_by,
            profile_pic_url,
            username,
          } = owner;

          const follower = edge_followed_by.count;
          const preview = display_resources[2].src;
          const profile = profile_pic_url;

          if (metaInfo.is_video === true) {
            const mediaURL = video_url;

            res.json({
              username,
              profile,
              follower,
              preview,
              mediaURL,
              likes,
            });
          } else {
            const mediaURL = display_url;

            res.json({
              username,
              profile,
              follower,
              preview,
              mediaURL,
              likes,
            });
          }
        }
      }).catch((err) => next(err));
    },
  );
}
