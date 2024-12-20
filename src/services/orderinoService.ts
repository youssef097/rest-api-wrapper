import axios from "axios";

const ODERINO_BASE_URL = process.env.ODERINO_BASE_URL || "";
console.log("ODERINO_BASE_URL", ODERINO_BASE_URL);
export const getOrders = async (customerId: string) => {
  try {
    console.log(`${ODERINO_BASE_URL}/customers/${customerId}/orders`);

    const response = await axios.get(
      `${ODERINO_BASE_URL}/customers/${customerId}/orders`
    );
    return response.data;
  } catch (error) {
    return { error: "Orders not found" };
  }
};

export const getOrderDetails = async (orderId: string) => {
  try {
    const response = await axios.get(`${ODERINO_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    return { error: "Order details not found" };
  }
};

export const getDeliveryDetails = async (orderId: string) => {
  try {
    const response = await axios.get(
      `${ODERINO_BASE_URL}/orders/${orderId}/delivery`
    );
    return response.data;
  } catch (error) {
    return { error: "Delivery details not found" };
  }
};
