import Link from 'next/link';
import styles from '../legal.module.css';

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.intro}>
          We use the information you share with OMO Digital to respond to enquiries, deliver requested
          services, and improve how we support our clients.
        </p>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <p>
            We collect contact details, project information, and communication history when you submit forms,
            contact our team, or subscribe to updates.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How We Use It</h2>
          <p>
            We use this information to reply to requests, provide proposals, deliver services, share relevant
            updates, and maintain service records.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Choices</h2>
          <p>
            You can request access, correction, or deletion of your personal data by contacting our team at
            hello@omodigital.io.
          </p>
        </section>

        <Link href="/" className={styles.backLink}>Back to home</Link>
      </div>
    </main>
  );
}
