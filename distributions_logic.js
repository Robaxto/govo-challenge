import { getOrdersPricingData } from "./fees_logic.js";

export const getOrdersDistributions = (orders, fees) => {
    const ordersData = getOrdersPricingData(orders, fees);
    const globalFunds = {};

    for (const order of ordersData) {
        order.funds = setOrderFunds(order, globalFunds);
    }

    return { ordersData, globalDistributions: globalFunds };
}

const setOrderFunds = (order, globalFunds) => {
    const orderFunds = {};
    let orderFundsAmount = 0;
    for (const item of order.items) {
        orderFundsAmount += setItemFunds(item, orderFunds, globalFunds);
        order.funds = orderFunds;
    }
    
    const extra = order.totalAmount - orderFundsAmount;
    if (extra) {
        const otherFund = { name: 'Other', amount: extra };
        addFund(orderFunds, otherFund);
        addFund(globalFunds, otherFund);
    }

    return orderFunds;
}

const setItemFunds = (item, orderFunds, globalFunds) => {
    let itemFundsAmount = 0;
    for (const distribution of item.distributions) {
        itemFundsAmount += +distribution.amount;
        addFund(orderFunds, distribution);
        addFund(globalFunds, distribution);
    }
    return itemFundsAmount;
}

const addFund = (destination, distribution) => {
    const destinationFunds = +destination[distribution.name];
    const distributionAmount = +distribution.amount;
    if(!destinationFunds) {
        destination[distribution.name] = distributionAmount.toFixed(2);
        return;
    }
    destination[distribution.name] = (destinationFunds + distributionAmount).toFixed(2);
}

export const logDistributionsChallengeResult = (ordersResult, totalDistributions) => {
    console.log();
    for (const order of ordersResult) {
        console.log(`Order ID: ${order.orderId}`);
        for (const fund in order.funds) {
            console.log(`   Fund - ${fund}: $${order.funds[fund]}`); 
        }
        console.log();
    }
    console.log(`Total distributions:`);
    for (const distribution in totalDistributions) {
        console.log(`   Fund - ${distribution}: $${totalDistributions[distribution]}`); 
    }
    console.log();
}
