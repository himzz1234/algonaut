export async function startRazorpayPayment(amount: number) {
  const orderRes = await fetch("/api/payments/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const order = await orderRes.json();
  if (!order.id) throw new Error("Failed to create order");

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Algonaut",
    description: "Pro Plan Subscription",
    order_id: order.id,
    handler: async function (response: any) {
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const result = await verifyRes.json();

      if (result.valid) {
        alert("Payment successful! Thank you for subscribing!");
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    },
    theme: { color: "#00c77b" },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}
