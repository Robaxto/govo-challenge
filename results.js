import orders from './orders.json' with { type: "json" };
import fees from './fees.json' with { type: "json" };
import { getOrdersDistributions, logDistributionsChallengeResult } from "./distributions_logic.js";
import { logFeesChallengeResult } from "./fees_logic.js";

const { ordersData, globalDistributions } = getOrdersDistributions(orders, fees);
console.log();
console.log('------------------Part 1------------------');
logFeesChallengeResult(ordersData);

console.log();
console.log('------------------Part 2------------------');
logDistributionsChallengeResult(ordersData, globalDistributions)