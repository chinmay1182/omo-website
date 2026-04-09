import Link from 'next/link';
import styles from '../legal.module.css';

export default function RefundPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.title}>Refund Policy</h1>
        <p className={styles.intro}>
          Refund eligibility depends on the service agreement, delivery stage, and the scope of work already
          completed by the OMO Digital.
        </p>

        <section className={styles.section}>
          <h2>Project Services</h2>
          <p>
            Strategy, design, development, and consulting work are typically billed against time and milestones,
            so completed work is generally non-refundable unless otherwise agreed in writing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Product and Subscription Cases</h2>
          <p>
            If a product-specific refund policy applies, it will be shared during onboarding or inside the
            relevant commercial agreement.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How to Request Help</h2>
          <p>
            Please contact hello@omodigital.io with your invoice or engagement details so we can review the
            request promptly.
          </p>
        </section>

        <Link href="/" className={styles.backLink}>Back to home</Link>
      </div>
    </main>
  );
}
