import axios from "axios";

const FINANCERO_BASE_URL = process.env.FINANCERO_BASE_URL || "";
const FINANCERO_MOCK_BASE_URL = process.env.FINANCERO_MOCK_BASE_URL || "";

console.log("FINANCERO_BASE_URL", FINANCERO_BASE_URL);
console.log("FINANCERO_MOCK_BASE_URL", FINANCERO_BASE_URL);

export const getCustomerAddress = async (customerId: string) => {
  try {
    const response = await axios.get(
      `${FINANCERO_BASE_URL}/customers/${customerId}/address`
    );
    return response.data;
  } catch (error) {
    return { error: "Customer address not found" };
  }
};

export const getBillingInfo = async (customerId: string) => {
  try {
    const response = await axios.get(
      `${FINANCERO_BASE_URL}/customers/${customerId}/billing-info`
    );
    return response.data;
  } catch (error) {
    return { error: "Billing info not found" };
  }
};

export const getInvoices = async (customerId: string) => {
  try {
    const response = await axios.get(
      `${FINANCERO_MOCK_BASE_URL}/customers/${customerId}/invoices`
    );

    return response.data;
  } catch (error) {
    return { error: "Invoices not found" };
  }
};
