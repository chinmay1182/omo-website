"use client";
import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../FocusAreas.module.css';

export default function FocusAreas() {
  const focusItems = [
    {
      id: 1,
      title: "website development",
      iconPath: "/icons/grad1.svg",
    },
    {
      id: 2,
      title: "ui/ux & illustrations",
      iconPath: "/icons/grad6.svg",
    },
    {
      id: 3,
      title: "mobile application development",
      iconPath: "/icons/grad2.svg",
    },
    {
      id: 4,
      title: "ai-ml & blockchain",
      iconPath: "/icons/grad3.svg",
    },
  {
      id: 5,
      title: "it consultancy & advisory",
      iconPath: "/icons/grad4.svg",
    },
    {
      id: 6,
      title: "brand management",
      iconPath: "/icons/grad5.svg",
    }
  ];

  return (
    <section id="services" className={styles.focusAreasSection}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className={styles.headerSection}>
              <h2 className={styles.mainTitle}>Focus Areas</h2>
              <p className={styles.subtitle}>
                Keeping things simple is a core philosophy that drives us in our pursuit of crafting purpose-built solutions to drive data-led transformation for organizations.
              </p>
            </div>

            <div className={styles.focusItemsContainer}>
              {focusItems.map((item) => (
                <div key={item.id} className={styles.focusItem}>
                  <div className={styles.itemContent}>
                    <div className={styles.iconContainer}>
                      <div className={styles.iconCircle}>
                        <Image src={item.iconPath} alt={item.title} width={50} height={50} className={styles.icon} />
                      </div>
                    </div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.buttonContainer}>
              <a href="#contact" className={styles.viewAllBtn}>
                View all services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
