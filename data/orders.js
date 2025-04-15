const orders = [
  {
    _id: "67ed981187368c7bb51b1c00",
    user: "67ed981187368c7bb51b1a00",
    products: [{ product: "67ed981187368c7bb51b1b00", quantity: 2 }],
    status: "completed",
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    purchasedAt: "2024-04-01T00:00:00Z",
    completedAt: "2024-04-03T00:00:00Z",
    totalPrice: 49.98,
    notes: "Order month April 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c01",
    user: "67ed981187368c7bb51b1a01",
    products: [{ product: "67ed981187368c7bb51b1b01", quantity: 1 }],
    status: "completed",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    purchasedAt: "2024-05-01T00:00:00Z",
    completedAt: "2024-05-03T00:00:00Z",
    totalPrice: 25.99,
    notes: "Order month May 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c02",
    user: "67ed981187368c7bb51b1a02",
    products: [{ product: "67ed981187368c7bb51b1b02", quantity: 1 }],
    status: "completed",
    paymentMethod: "bank_transfer",
    paymentStatus: "completed",
    purchasedAt: "2024-06-01T00:00:00Z",
    completedAt: "2024-06-03T00:00:00Z",
    totalPrice: 79.99,
    notes: "Order month June 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c03",
    user: "67ed981187368c7bb51b1a03",
    products: [{ product: "67ed981187368c7bb51b1b03", quantity: 2 }],
    status: "completed",
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    purchasedAt: "2024-07-01T00:00:00Z",
    completedAt: "2024-07-03T00:00:00Z",
    totalPrice: 99.98,
    notes: "Order month July 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c04",
    user: "67ed981187368c7bb51b1a04",
    products: [{ product: "67ed981187368c7bb51b1b04", quantity: 1 }],
    status: "completed",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    purchasedAt: "2024-08-01T00:00:00Z",
    completedAt: "2024-08-03T00:00:00Z",
    totalPrice: 74.50,
    notes: "Order month August 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c05",
    user: "67ed981187368c7bb51b1a05",
    products: [{ product: "67ed981187368c7bb51b1b05", quantity: 1 }],
    status: "completed",
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    purchasedAt: "2024-09-01T00:00:00Z",
    completedAt: "2024-09-03T00:00:00Z",
    totalPrice: 49.99,
    notes: "Order month September 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c06",
    user: "67ed981187368c7bb51b1a06",
    products: [{ product: "67ed981187368c7bb51b1b06", quantity: 2 }],
    status: "completed",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    purchasedAt: "2024-10-01T00:00:00Z",
    completedAt: "2024-10-03T00:00:00Z",
    totalPrice: 79.98,
    notes: "Order month October 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c07",
    user: "67ed981187368c7bb51b1a07",
    products: [{ product: "67ed981187368c7bb51b1b07", quantity: 1 }],
    status: "completed",
    paymentMethod: "bank_transfer",
    paymentStatus: "completed",
    purchasedAt: "2024-11-01T00:00:00Z",
    completedAt: "2024-11-03T00:00:00Z",
    totalPrice: 45.77,
    notes: "Order month November 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c08",
    user: "67ed981187368c7bb51b1a08",
    products: [{ product: "67ed981187368c7bb51b1b08", quantity: 1 }],
    status: "completed",
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    purchasedAt: "2024-12-01T00:00:00Z",
    completedAt: "2024-12-03T00:00:00Z",
    totalPrice: 50.00,
    notes: "Order month December 2024"
  },
  {
    _id: "67ed981187368c7bb51b1c09",
    user: "67ed981187368c7bb51b1a09",
    products: [{ product: "67ed981187368c7bb51b1b09", quantity: 1 }],
    status: "completed",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    purchasedAt: "2025-01-01T00:00:00Z",
    completedAt: "2025-01-03T00:00:00Z",
    totalPrice: 29.99,
    notes: "Order month January 2025"
  },
  {
    _id: "67ed981187368c7bb51b1c0a",
    user: "67ed981187368c7bb51b1a10",
    products: [{ product: "67ed981187368c7bb51b1b10", quantity: 1 }],
    status: "completed",
    paymentMethod: "credit_card",
    paymentStatus: "completed",
    purchasedAt: "2025-02-01T00:00:00Z",
    completedAt: "2025-02-03T00:00:00Z",
    totalPrice: 29.99,
    notes: "Order month February 2025"
  },
  {
    _id: "67ed981187368c7bb51b1c0b",
    user: "67ed981187368c7bb51b1a11",
    products: [{ product: "67ed981187368c7bb51b1b11", quantity: 2 }],
    status: "completed",
    paymentMethod: "paypal",
    paymentStatus: "completed",
    purchasedAt: "2025-03-01T00:00:00Z",
    completedAt: "2025-03-03T00:00:00Z",
    totalPrice: 71.98,
    notes: "Order month March 2025"
  },
  {
    _id: "67ed981187368c7bb51b1c0c",
    user: "67ed981187368c7bb51b1a12",
    products: [{ product: "67ed981187368c7bb51b1b12", quantity: 1 }],
    status: "completed",
    paymentMethod: "bank_transfer",
    paymentStatus: "completed",
    purchasedAt: "2025-04-01T00:00:00Z",
    completedAt: "2025-04-03T00:00:00Z",
    totalPrice: 35.00,
    notes: "Order month April 2025"
  }
];

module.exports = orders;



