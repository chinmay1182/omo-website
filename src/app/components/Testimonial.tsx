"use client";
import React, { useState } from "react";
import styles from "../Testimonials.module.css";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    position: string;
    image: string;
    testimonial: string;
    bgColor: string;
}

const Testimonials: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Alessandro Romano",
            position: "Chief Technology Officer",
            image: "/testimonials/test1.jpg",
            testimonial:
                "I found the digital experts I needed to transform our legacy systems. Their professional balance and technical expertise exceeded all expectations. The team delivered innovative solutions that perfectly aligned with our business goals, resulting in a 40% increase in operational efficiency.",
            bgColor: "#E5E797",
        },
        {
            id: 2,
            name: "Hiroshi Tanaka",
            position: "Senior Software Architect",
            image: "/testimonials/test2.jpg",
            testimonial:
                "They went above and beyond what we initially requested. For digital enhancements and scalable architecture, it's essential to embrace bold ideas, and this team delivered exactly that. Their attention to detail and commitment to quality made our product launch a tremendous success.",
            bgColor: "#BDE5D3",
        },
        {
            id: 3,
            name: "Ingrid Larsson",
            position: "Product Strategy Director",
            image: "/testimonials/test3.jpg",
            testimonial:
                "Exceptional service and outstanding results that transformed our user experience. The team's dedication and innovative approach truly impressed our entire organization. They not only met our tight deadlines but also provided valuable insights that improved our product roadmap significantly.",
            bgColor: "#FFD3B5",
        },
        {
            id: 4,
            name: "Viktor Petrov",
            position: "Lead DevOps Engineer",
            image: "/testimonials/test4.jpg",
            testimonial:
                "Professional approach combined with cutting-edge innovative solutions. They delivered beyond expectations while maintaining excellent communication throughout the project. The infrastructure improvements they implemented reduced our deployment time by 60% and enhanced system reliability.",
            bgColor: "#D1C4E9",
        },
        {
            id: 5,
            name: "Camille Dubois",
            position: "Digital Marketing Director",
            image: "/testimonials/test1.jpg",
            testimonial:
                "Smooth process from start to finish, and their creative input was absolutely top-notch. I highly recommend collaborating with them for any digital transformation project. Their strategic approach to user engagement resulted in a 250% increase in our online conversion rates.",
            bgColor: "#FFCDD2",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= testimonials.length - 3 ? 0 : prevIndex + 1
        );
    };

    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % testimonials.length;
            visible.push(testimonials[index]);
        }
        return visible;
    };

    return (
        <section id="testimonials" className={styles.testimonialsSection}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Our clients are forward thinkers, aiming to <br />
                        shape the future with bold ideas.
                    </h2>
                    <div className={styles.navigation}>
                        <button
                            className={`${styles.navButton} ${styles.prevButton}`}
                            onClick={goToPrevious}
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            className={`${styles.navButton} ${styles.nextButton}`}
                            onClick={goToNext}
                            aria-label="Next testimonial"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <div className={styles.testimonialsContainer}>
                    <div className={styles.testimonialsWrapper}>
                        {getVisibleTestimonials().map((testimonial, index) => (
                            <React.Fragment key={`${testimonial.id}-${currentIndex}-${index}`}>
                                <div className={styles.imageCard}>
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={300}
                                        height={300}
                                        className={styles.testimonialImage}
                                    />
                                </div>
                                <div
                                    className={styles.testimonialCard}
                                    style={{ backgroundColor: testimonial.bgColor }}
                                >
                                    <p className={styles.testimonialText}>{testimonial.testimonial}</p>
                                    <div className={styles.profileInfo}>
                                        <h3 className={styles.clientName}>{testimonial.name}</h3>
                                        <p className={styles.clientPosition}>{testimonial.position}</p>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
