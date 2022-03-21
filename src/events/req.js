/**
 * @name igdl
 * @version v0.0.1
 * @author ipincamp <support@nur-arifin.my.id>
 * @license MIT
 */

/**
 *
 * @param {import("express").Application} apps
 */
export default function funcREQ(apps) {
  apps.get('/', (req, res) => res.sendStatus(200));
}
