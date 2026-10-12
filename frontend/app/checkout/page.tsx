import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main>
      <section className="hero">
        <h1>Checkout</h1>
        <p>Enter the order and customer details, then continue to the secure payment page.</p>
      </section>
      <CheckoutForm />
    </main>
  );
}
