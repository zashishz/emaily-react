const router = require('express').Router();
const _ = require('lodash');
const {URL} = require('url');
const Path = require('path-parser').default;
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.get('/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });
    res.send(surveys);
})

router.get('/surveys/webhooks/:surveyId/:choice', (req, res) =>  res.send("Thanks your response has been recorded!"));

router.post('/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()  
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    
    try {
        await mailer.send();
        await survey.save();
        req.user.credits -=1;
        const user = await req.user.save();
        res.send(user);
    } catch (err) {
        res.status(422).send(err);
    }
})

router.post('/surveys/webhooks', (req, res) => {
    _.chain(req.body)
    .map(({url, email}) => {
        const pathname = new URL(url).pathname;
        const p = new Path('/api/surveys/webhooks/:surveyId/:choice');
        const match = p.test(pathname);
        
        console.log(match);
        if(match) {
            return { surveyId: match.surveyId, choice: match.choice, email }
        }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
            _id: surveyId,
            recipients: {
                $elemMatch: { email: email, responded: false }
            }
        }, {
            $inc: { [choice] : 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
        }).exec()
    })
    .value();
    res.send({});
})

module.exports = router;