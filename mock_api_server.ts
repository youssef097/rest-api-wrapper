import express from "express";
import dotenv from "dotenv";

dotenv.config();

const financeroApp = express();
const oderinoApp = express();

const PORT_FINANCERO = process.env.PORT_FINANCERO || 5000;
const PORT_ORDERINO = process.env.PORT_ORDERINO || 5001;

// BASIC FINANCERO Mock Endpoints
financeroApp.get("/financero/v1/customers/:customer_id/address", (req, res) => {
  res.json({
    customer_id: req.params.customer_id,
    company_name: "ABC Corp",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  });
});

financeroApp.get(
  "/financero/v1/customers/:customer_id/billing-info",
  (req, res) => {
    res.json({
      customer_id: req.params.customer_id,
      payment_terms: "Net 30",
      credit_limit: 10000,
      currency: "USD",
    });
  }
);

financeroApp.get(
  "/financero/mockapi/v3-1/customers/:customer_id/invoices",
  (req, res) => {
    res.json({
      customer_id: req.params.customer_id,
      invoices: [
        {
          invoice_id: "INV-001",
          amount: 5000,
          currency: "USD",
          status: "Paid",
          due_date: "2024-12-31",
        },
        {
          invoice_id: "INV-002",
          amount: 3000,
          currency: "USD",
          status: "Pending",
          due_date: "2024-11-30",
        },
      ],
    });
  }
);

// BASIC ODERINO Mock Endpoints
oderinoApp.get("/oderino/v1/customers/:customer_id/orders", (req, res) => {
  res.json({
    customer_id: req.params.customer_id,
    orders: [
      {
        order_id: "ORD-001",
        status: "Delivered",
      },
      {
        order_id: "ORD-002",
        status: "In Progress",
      },
    ],
  });
});

oderinoApp.get("/oderino/v2/orders/:order_id", (req, res) => {
  res.json({
    order_id: req.params.order_id,
    status: "Delivered",
    order_date: "2024-11-01",
    total_value: 2000,
    currency: "USD",
    vendor: "Vendor A",
  });
});

oderinoApp.get("/oderino/v2/orders/:order_id/jobs", (req, res) => {
  res.json({
    order_id: req.params.order_id,
    jobs: [
      {
        job_id: "JOB-001",
        status: "Completed",
        completion_date: "2024-11-05",
      },
      {
        job_id: "JOB-002",
        status: "In Progress",
      },
    ],
  });
});

oderinoApp.get("/oderino/v1/orders/:order_id/delivery", (req, res) => {
  res.json({
    order_id: req.params.order_id,
    delivery_status: "Delivered",
    delivery_date: "2024-11-10",
    tracking_number: "TRK123456789",
    carrier: "DHL",
  });
});

financeroApp.listen(PORT_FINANCERO, () => {
  console.log(
    `Financero mock server is running at http://localhost:${PORT_FINANCERO}`
  );
});

oderinoApp.listen(PORT_ORDERINO, () => {
  console.log(
    `Oderino mock server is running at http://localhost:${PORT_ORDERINO}`
  );
});
