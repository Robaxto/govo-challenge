export const getOrdersPricingData = (orders, fees) => {
    const allOrdersPricingData = [];

    for (const order of orders) {
        const orderPricingData = { orderId: order.order_number };
        const { itemsData, orderTotalAmount } = getItemsPricingData(order, fees);
        orderPricingData.items = itemsData;
        orderPricingData.totalAmount = orderTotalAmount;
        allOrdersPricingData.push(orderPricingData);
    }

    return allOrdersPricingData;
}

const getItemsPricingData = (order, fees) => {
    const itemsData = [];
    let orderTotalAmount = 0;
    for (const item of order.order_items) {
        const itemData = { item: item.type };
        const { itemAmount, itemDistributions } = getItemFeesData(item, fees);
        itemData.amount = itemAmount.toFixed(2);
        itemData.distributions = itemDistributions;
        orderTotalAmount += itemAmount;
        itemsData.push(itemData);
    }
    return { itemsData, orderTotalAmount: orderTotalAmount.toFixed(2) };
}

const getItemFeesData = (item, fees) => {
    const itemFees = fees.find((fee) => fee.order_item_type === item.type);
    const itemDistributions = itemFees.distributions;
    let itemAmount = 0;
    for (const itemFee of itemFees.fees) {
        itemAmount += calculateFeeAmount(itemFee, item.pages);
    }
    return { itemAmount, itemDistributions };
}

const calculateFeeAmount = (fee, pages) => {
    if (fee.type === 'flat') return +fee.amount;
    return +fee.amount * (pages - 1);
}

export const logFeesChallengeResult = (ordersResult) => {
    console.log();
    for (const order of ordersResult) {
        console.log(`Order ID: ${order.orderId}`);
        let itemCount = 1;
        for (const item of order.items) {
            console.log(`   Order item ${itemCount}: $${item.amount}`); 
            itemCount++;
        }
        console.log();
        console.log(`   Order total: $${order.totalAmount}`);
        console.log();
    }
}