const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req, res, next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('promotion created', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put action is not supported for /promotion .');
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

promoRouter.route('/:promotionId')
.get((req, res, next) => {
    Promotions.findById(req.params.promotionId)
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('post operation is not supported in /promotion/' + req.params.promotionId );
})

.put(authenticate.verifyUser, (req, res, next) => {
   Promotions.findByIdAndUpdate(req.params.promotionId, {
    $set : req.body
   }, {new: true})
   .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});
module.exports = promoRouter;