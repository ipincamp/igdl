/**
 * @name igdl
 * @version v0.0.1
 * @author ipincamp <support@nur-arifin.my.id>
 * @license MIT
 */

const download = document.querySelector('.dwn');
const errorURL = document.querySelector('.eru');
const folLower = document.querySelector('.flr');
const inputURL = document.querySelector('.url');
const mediaLIK = document.querySelector('.mlk');
const mediaTMB = document.querySelector('.tmb');
const previTMB = document.querySelector('.prb');
const searchBT = document.querySelector('.srb');
const userName = document.querySelector('.usr');

const getShow = (...args) => args.forEach((x) => x.classList.remove('d-none'));

const notfEru = () => {
  getShow(errorURL);

  setTimeout(() => {
    window.location.reload();
  }, 1500);
};

const getInputURL = () => {
  const url = inputURL.value;

  if (!url) {
    notfEru();
    return;
  }

  let newURL;

  if (url.length === 11) {
    newURL = `https://www.instagram.com/p/${url}/?__a=1`;
  } else if (url.includes('instagram.com')) {
    const a = url.split('?utm')[0];
    newURL = `${a}?__a=1`;
  }

  return newURL;
};

const getDownload = (url) => {
  let anchor = `/get?url=${url}`;

  const a = document.createElement('a');
  a.href = anchor;
  a.click();
  return a;
};

const getMetaData = async (url) => {
  const res = await fetch(`/api?url=${url}`);
  return res.json();
};

searchBT.addEventListener('click', async () => {
  const url = getInputURL();

  if (!url) {
    notfEru();
    return;
  }

  try {
    const {
      username,
      profile,
      follower,
      preview,
      likes,
    } = await getMetaData(url);

    mediaTMB.src = profile;
    userName.textContent = username;
    folLower.textContent = follower;

    previTMB.src = preview;
    mediaLIK.textContent = likes;
  } catch (err) {
    console.error(err);
  }
});

download.addEventListener(
  'click',
  () => {
    try {
      getDownload(getInputURL());
    } catch (err) {
      console.error(err);
    }
  },
);
