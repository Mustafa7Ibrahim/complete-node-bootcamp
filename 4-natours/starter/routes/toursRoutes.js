const express = require('express');

const router = express.Router();
const tourController = require('../controllers/toursController');

// router.param('id', tourController.checkId);

router
  .route('/top-5-cheap')
  .get(tourController.getTopFiveCheapTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.addNewTour);

router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
