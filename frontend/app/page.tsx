import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <h1>SSLCOMMERZ Hosted Checkout</h1>
        <p>
          A deployment-ready demo: a Next.js frontend that hands the order to a
          TypeScript backend, which creates the SSLCOMMERZ session and redirects the
          customer to the hosted payment page.
        </p>
      </section>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>How the flow works</h2>
        <ol className="muted" style={{ paddingLeft: 18, margin: 0 }}>
          <li>You submit the checkout form.</li>
          <li>
            The backend <code>POST</code>s to{" "}
            <code>/gwprocess/v4/api.php</code> and returns a{" "}
            <code>GatewayPageURL</code>.
          </li>
          <li>You are redirected to the SSLCOMMERZ hosted page and pay.</li>
          <li>
            SSLCOMMERZ redirects to the backend success/fail/cancel handlers, which
            re-validate via the Order Validation API and then send you to the matching
            result page.
          </li>
        </ol>
        <Link className="link-button" href="/checkout">
          Go to checkout
        </Link>
      </div>
    </main>
  );
}
