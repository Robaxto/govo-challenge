import orders from './orders.json' with { type: "json" };
import fees from './fees.json' with { type: "json" };
import { getOrdersPricingData, logFeesChallengeResult } from "./fees_logic.js";

const ordersData = getOrdersPricingData(orders, fees);

logFeesChallengeResult(ordersData);