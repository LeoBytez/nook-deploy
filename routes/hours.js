// Opening hours page, added on the feature/opening-hours branch
const express = require('express');

const router = express.Router();

const HOURS = [
  ['Monday', 'Closed'],
  ['Tuesday to Thursday', '10:00 AM - 6:00 PM'],
  ['Friday', '10:00 AM - 9:00 PM'],
  ['Saturday', '9:00 AM - 7:00 PM'],
  ['Sunday', '11:00 AM - 4:00 PM'],
];

module.exports = (page) => {
  router.get('/hours', (req, res) => {
    const rows = HOURS.map(([day, time]) => `<tr><td>${day}</td><td>${time}</td></tr>`).join('');
    res.send(
      page(
        'Hours',
        `<p class="eyebrow">Visit us</p>
        <h1>Opening <em>hours</em></h1>
        <div class="panel"><table>${rows}</table></div>`
      )
    );
  });
  return router;
};
