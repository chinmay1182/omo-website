import Link from 'next/link';
import styles from '../legal.module.css';

export default function TermsOfServicePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.intro}>
          These terms govern how visitors and clients use the OMO Digital website, contact forms, and related
          digital services.
        </p>

        <section className={styles.section}>
          <h2>Use of the Website</h2>
          <p>
            You agree to use this website lawfully, avoid harmful activity, and provide accurate information
            when submitting enquiries or service requests.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Service Engagements</h2>
          <p>
            Any project, consulting, or product work is subject to separate commercial agreements, timelines,
            and delivery scopes confirmed with our team.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            For contractual or support questions, reach out to hello@omodigital.io and we will guide you to the
            right team.
          </p>
        </section>

        <Link href="/" className={styles.backLink}>Back to home</Link>
      </div>
    </main>
  );
}
