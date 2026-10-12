import Link from "next/link";

interface FailPageProps {
  searchParams: Promise<{
    tran_id?: string;
    status?: string;
    amount?: string;
  }>;
}

export default async function FailPage({ searchParams }: FailPageProps) {
  const { tran_id, status, amount } = await searchParams;

  return (
    <main>
      <div className="card">
        <span className="badge fail">Payment failed</span>
        <h1 style={{ fontSize: "1.4rem", marginTop: 16 }}>The payment did not go through</h1>
        <p className="muted">
          The transaction was declined or could not be completed. No amount has been
          charged. You can try again.
        </p>

        <dl className="details">
          <dt>Transaction ID</dt>
          <dd>{tran_id ?? "—"}</dd>
          <dt>Amount</dt>
          <dd>{amount ?? "—"}</dd>
          <dt>Status</dt>
          <dd>{status ?? "—"}</dd>
        </dl>

        <Link className="link-button" href="/checkout">
          Try again
        </Link>
      </div>
    </main>
  );
}
