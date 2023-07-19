const express=require('express');

const router=express.Router();

//METHOD: GET, Subscription details according to the customer id
router.get('/getSubscription/:customerID', async (req, res, next)=>{
    const id = req.params.customerID;
    console.log(id);
    res.status(201).json({success: 'success', customerID: id});
});


//METHOD GET, Resource Groups according to subscription id
router.get('/getResourceGroups/:subscriptionID', async (req, res, next)=>{
    const id = req.params.subscriptionID;
    res.status(201).json({success: 'success', subscriptionID: id});
})

//METHOD GET, Consumption Detail
router.get('/getConsumptionDetail/:subscriptionID', async (req, res, next)=>{
    const id = req.params.subscriptionID;
    res.status(201).json({success: 'success', subscriptionID: id});
});

module.exports = router;