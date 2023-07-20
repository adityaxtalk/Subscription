const customerData=require('../data/customerData.json');
const subscriptionData=require('../data/subscriptionData.json');
const resourceGroupData=require('../data/resourceGroup.json');
const consumptionData=require('../data/consumptionData.json');
const express=require('express');
const router=express.Router();


//METHOD: GET, Customer Data
router.get('/getCustomerData', (req, res, next)=>{
    const customerDetail=customerData.map((data)=>{
       const {subscriptionId, ...detail} = data;
       return detail;
    });
    res.status(201).json({success: 'success', customerData: customerDetail});
});

// METHOD: GET, Subscription Details w.r.t customerId
router.get('/getSubscriptionData/:customerId', (req, res, next)=>{
    const id=req.params.customerId;
    let data=customerData.filter((item)=> item.customerId === id)[0].subscriptionId;
    data=subscriptionData.filter((subscription)=> data.indexOf(subscription.subscriptionId) > -1);
    res.status(201).json({success: 'success', subscriptionData: data});

});

//METHOD GET, Resource Groups according to subscription id
router.get('/getResourceGroups/:subscriptionId', async (req, res, next)=>{
    const id = req.params.subscriptionId;
    let data=resourceGroupData.filter((resource)=> resource.subscriptionId.indexOf(id) > -1);
    data = data.map((subscription) => {
            const {subscriptionId, ...detail} = subscription;
            return detail
    });
    res.status(201).json({success: 'success', resourceData: data});
})

//METHOD GET, Consumption Detail
router.get('/getConsumptionDetail/:subscriptionId', async (req, res, next)=>{
    const id = req.params.subscriptionId;
    let data=consumptionData.filter((resource)=> resource.subscriptionId.indexOf(id) > -1);
    data=data.map((subscription) => {
        const {subscriptionId, ...detail} = subscription;
        return detail
});
   console.log(data);
    res.status(201).json({success: 'success', consumptionData: data});
});

module.exports = router;