import { Request, Response } from "express";
import * as financeroService from "../services/financieroService";
import * as oderinoService from "../services/orderinoService";
import { getCachedData, setCachedData } from "../utils/cache";

export const getCustomerSummary = async (req: Request, res: Response) => {
  const { customer_id } = req.params;

  const cachedData = getCachedData(customer_id);
  if (cachedData) return res.json(cachedData);

  try {
    const [address, billingInfo, invoices, orders] = await Promise.all([
      financeroService.getCustomerAddress(customer_id),
      financeroService.getBillingInfo(customer_id),
      financeroService.getInvoices(customer_id),
      oderinoService.getOrders(customer_id),
    ]);

    const orderDetails = await Promise.all(
      (orders?.orders || []).map(async (order: any) => {
        const details = await oderinoService.getOrderDetails(order.order_id);
        const delivery = await oderinoService.getDeliveryDetails(
          order.order_id
        );
        return { ...details, delivery };
      })
    );

    const summary = {
      customer_id,
      address,
      billing_info: billingInfo,
      invoices,
      orders: orderDetails,
    };

    setCachedData(customer_id, summary);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customer summary" });
  }
};
