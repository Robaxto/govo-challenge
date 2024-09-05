import orders from './orders.json' with { type: "json" };
import fees from './fees.json' with { type: "json" };
import { getOrdersDistributions, logDistributionsChallengeResult } from "./distributions_logic.js";

const { ordersData, globalDistributions } = getOrdersDistributions(orders, fees);

logDistributionsChallengeResult(ordersData, globalDistributions);