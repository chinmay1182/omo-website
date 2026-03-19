'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from '../ContactForm.module.css';
import { emailService } from '../services/emailService';
import { trackContactForm } from './Analytics';
import TranslatedText from './TranslatedText';

const ContactForm: React.FC = () => {
    const [selectedServices, setSelectedServices] = useState<string[]>(['Website Development']);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        companyName: '',
        projectDescription: ''
    });

    const services = [
        'Website Development',
        'Design',
        'Mobile',
        'Animation',
        'Illustrations'
    ];

    const faqs = [
        {
            question: 'How quickly do you respond after an enquiry?',
            answer: 'Our team usually replies within one business day. For urgent product, website, or support requests, we aim to respond much faster during working hours.'
        },
        {
            question: 'How do you approach design and wireframing?',
            answer: 'We begin with discovery, user flows, and content structure, then move into wireframes and visual direction. This helps us align business goals, user experience, and development feasibility before full design starts.'
        },
        {
            question: 'Can you handle both design and development for a project?',
            answer: 'Yes. OMO Digital supports end-to-end delivery across strategy, UI/UX, branding, websites, product builds, and scalable development so you do not need to coordinate multiple vendors.'
        },
        {
            question: 'What types of businesses do you usually work with?',
            answer: 'We work with growing brands, startups, and established businesses that need stronger digital presence, better customer journeys, or custom technology solutions that can scale.'
        },
        {
            question: 'Where is OMO Digital based and do you work remotely?',
            answer: 'We are based in India and work with clients across locations through remote collaboration, structured communication, and milestone-based delivery.'
        }
    ];

    const handleServiceToggle = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const handleFAQToggle = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const success = await emailService.sendContactForm({
                fullName: formData.fullName,
                companyEmail: formData.email,
                companyName: formData.companyName,
                projectDescription: `${formData.projectDescription}\n\nSelected Services: ${selectedServices.join(', ')}`
            });

            if (success) {
                setSubmitStatus('success');
                trackContactForm('main_contact_form');
                toast.success('Your enquiry has been sent to our team.');
                
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    companyName: '',
                    projectDescription: ''
                });
                setSelectedServices(['Website Development']);
            } else {
                setSubmitStatus('error');
                toast.error('We could not send your enquiry right now. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            toast.error('Something went wrong while sending your enquiry.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contact" className={`container-fluid ${styles.container}`}>
            <div className="row min-vh-100">
                {/* Left Section */}
                <div className={`col-lg-6 ${styles.leftSection}`}>
                    <div className={styles.leftContent}>
                        <h1 className={styles.mainHeading}>
                            <TranslatedText text="Let's create," /><br />
                            <TranslatedText text="progress together" />
                        </h1>

                        <div className={styles.servicesContainer}>
                            {services.map((service) => (
                                <button
                                    key={service}
                                    className={`${styles.serviceTag} ${selectedServices.includes(service) ? styles.serviceTagSelected : ''
                                        }`}
                                    onClick={() => handleServiceToggle(service)}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Enter your full Name" />
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Company Email" />
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Company Name" />
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <TranslatedText text="Project Description" />
                                </label>
                                <textarea
                                    name="projectDescription"
                                    value={formData.projectDescription}
                                    onChange={handleInputChange}
                                    className={styles.textarea}
                                    rows={4}
                                    required
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    <TranslatedText text="Thank you! Your message has been sent successfully." />
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className={styles.errorMessage}>
                                    <TranslatedText text="Sorry, there was an error sending your message. Please try again." />
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className={styles.spinner}>⟳</span>
                                        <TranslatedText text="Sending..." />
                                    </>
                                ) : (
                                    <TranslatedText text="Submit Query" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Section */}
                <div className={`col-lg-6 ${styles.rightSection}`}>
                    <div className={styles.rightContent}>
                        <h2 className={styles.faqHeading}>
                            <TranslatedText text="FAQ's" />
                        </h2>

                        <div className={styles.faqContainer}>
                            {faqs.map((faq, index) => (
                                <div key={index} className={styles.faqItem}>
                                    <button
                                        className={styles.faqQuestion}
                                        onClick={() => handleFAQToggle(index)}
                                    >
                                        <span>{faq.question}</span>
                                        <span className={`${styles.faqIcon} ${expandedFAQ === index ? styles.faqIconExpanded : ''}`}>
                                            <ChevronDown size={18} />
                                        </span>
                                    </button>
                                    {expandedFAQ === index && (
                                        <div className={styles.faqAnswer}>
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
