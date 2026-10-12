import Link from "next/link";

interface CancelPageProps {
  searchParams: Promise<{
    tran_id?: string;
    status?: string;
  }>;
}

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const { tran_id, status } = await searchParams;

  return (
    <main>
      <div className="card">
        <span className="badge warning">Payment cancelled</span>
        <h1 style={{ fontSize: "1.4rem", marginTop: 16 }}>You cancelled the payment</h1>
        <p className="muted">
          The checkout was cancelled before completion. No amount has been charged.
        </p>

        <dl className="details">
          <dt>Transaction ID</dt>
          <dd>{tran_id ?? "—"}</dd>
          <dt>Status</dt>
          <dd>{status ?? "—"}</dd>
        </dl>

        <Link className="link-button" href="/checkout">
          Start over
        </Link>
      </div>
    </main>
  );
}
