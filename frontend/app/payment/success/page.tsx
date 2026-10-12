import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{
    tran_id?: string;
    status?: string;
    amount?: string;
    val_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { tran_id, status, amount, val_id } = await searchParams;
  const confirmed = status === "VALID" || status === "VALIDATED";

  return (
    <main>
      <div className="card">
        <span className={`badge ${confirmed ? "success" : "warning"}`}>
          {confirmed ? "Payment successful" : `Status: ${status ?? "UNKNOWN"}`}
        </span>
        <h1 style={{ fontSize: "1.4rem", marginTop: 16 }}>Thank you!</h1>
        <p className="muted">
          {confirmed
            ? "Your payment was validated successfully."
            : "We received your payment response. Validation status is shown above."}
        </p>

        <dl className="details">
          <dt>Transaction ID</dt>
          <dd>{tran_id ?? "—"}</dd>
          <dt>Amount</dt>
          <dd>{amount ?? "—"}</dd>
          <dt>Validation status</dt>
          <dd>{status ?? "—"}</dd>
          <dt>Validation ID</dt>
          <dd>{val_id ?? "—"}</dd>
        </dl>

        <Link className="link-button" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
