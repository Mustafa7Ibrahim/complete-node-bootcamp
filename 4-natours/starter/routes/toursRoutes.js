const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/toursController');

router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addNewTour);

router.route('/:id').get(tourController.getOneTour);

module.exports = router;
