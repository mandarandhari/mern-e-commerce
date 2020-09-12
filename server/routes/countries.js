const router = require('express').Router();

const Countries = require('../models/Countries');

router.post('/', async (req, res) => {
    return res.json('Countries already added');

    await Countries.insertMany([
        {
            name: 'Australia',
            abbr: 'AU'
        },
        {
            name: 'Bangladesh',
            abbr: 'BD'
        },
        {
            name: 'Belgium',
            abbr: 'BE'
        },
        {
            name: 'Brazil',
            abbr: 'BR'
        },
        {
            name: 'Canada',
            abbr: 'CA'
        },
        {
            name: 'Costa Rica',
            abbr: 'CR'
        },
        {
            name: 'Egypt',
            abbr: 'EG'
        },
        {
            name: 'France',
            abbr: 'FR'
        },
        {
            name: 'Germany',
            abbr: 'DE'
        },
        {
            name: 'Great Britain (UK)',
            abbr: 'GB'
        },
        {
            name: 'Hong Kong',
            abbr: 'HK'
        },
        {
            name: 'Indonesia',
            abbr: 'ID'
        },
        {
            name: 'Ireland',
            abbr: 'IE'
        },
        {
            name: 'Israel',
            abbr: 'IL'
        },
        {
            name: 'India',
            abbr: 'IN'
        },
        {
            name: 'British Indian Ocean Territory',
            abbr: 'IO'
        },
        {
            name: 'Iraq',
            abbr: 'IQ'
        },
        {
            name: 'Iran',
            abbr: 'IR'
        },
        {
            name: 'Italy',
            abbr: 'IT'
        },
        {
            name: 'Japan',
            abbr: 'JP'
        },
        {
            name: 'Korea (South)',
            abbr: 'KR'
        },
        {
            name: 'Sri Lanka',
            abbr: 'LK'
        },
        {
            name: 'Luxembourg',
            abbr: 'LU'
        },
        {
            name: 'Malaysia',
            abbr: 'MY'
        },
        {
            name: 'Mexico',
            abbr: 'MX'
        },
        {
            name: 'Netherlands',
            abbr: 'NL'
        },
        {
            name: 'New Zealand (Aotearoa)',
            abbr: 'NZ'
        },
        {
            name: 'Portugal',
            abbr: 'PT'
        },
        {
            name: 'Qatar',
            abbr: 'QA'
        },
        {
            name: 'Saudi Arabia',
            abbr: 'SA'
        },
        {
            name: 'Singapore',
            abbr: 'SG'
        },
        {
            name: 'South Africa',
            abbr: 'ZA'
        },
        {
            name: 'Spain',
            abbr: 'ES'
        },
        {
            name: 'Sweden',
            abbr: 'SE'
        },
        {
            name: 'Switzerland',
            abbr: 'CH'
        },
        {
            name: 'Thailand',
            abbr: 'TH'
        },
        {
            name: 'United Arab Emirates',
            abbr: 'AE'
        },
        {
            name: 'United Kingdom',
            abbr: 'UK'
        },
        {
            name: 'United States',
            abbr: 'US'
        },
        {
            name: 'Zimbabwe',
            abbr: 'ZW'
        }
    ]);

    res.send('Countries added');
});

module.exports = router;