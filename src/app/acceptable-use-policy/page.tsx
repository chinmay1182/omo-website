import Link from 'next/link';
import styles from '../legal.module.css';

export default function AcceptableUsePolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.title}>Acceptable Use Policy</h1>
        <p className={styles.intro}>
          We expect visitors, users, and clients to use OMO Digital platforms, communication channels, and
          shared resources responsibly and lawfully.
        </p>

        <section className={styles.section}>
          <h2>Prohibited Activity</h2>
          <p>
            You may not use our website or services to distribute malware, attempt unauthorized access, send
            spam, infringe intellectual property, or engage in abusive or unlawful conduct.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Security and Access</h2>
          <p>
            Any credentials, project environments, or hosted systems we provide must be used only for approved
            business purposes and kept secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Enforcement</h2>
          <p>
            We may suspend access or take protective action if activity threatens our users, systems, partners,
            or legal obligations.
          </p>
        </section>

        <Link href="/" className={styles.backLink}>Back to home</Link>
      </div>
    </main>
  );
}
