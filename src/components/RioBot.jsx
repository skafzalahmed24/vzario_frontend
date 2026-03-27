import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './RioBot.css';

const RioBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeResponse, setActiveResponse] = useState(null);
    const [showWish, setShowWish] = useState(true);
    const [greeting, setGreeting] = useState('');

    const avatarUrl = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png"; // Placeholder AI avatar

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning!');
        else if (hour < 18) setGreeting('Good Afternoon!');
        else setGreeting('Good Evening!');

        const timer = setTimeout(() => {
            setShowWish(false);
        }, 60000);

        return () => clearTimeout(timer);
    }, []);

    const questions = [
        {
            id: 1,
            question: "What is Vzario?",
            answer: "Vzario is a cutting-edge digital agency specializing in premium web experiences, modern design, and innovative digital solutions. We turn ideas into impact.",
            link: "/about",
            linkText: "Learn More About Us"
        },
        {
            id: 2,
            question: "What services do you offer?",
            answer: "We offer a wide range of services including Web Development, Branding, UI/UX Design, and Digital Strategy. Our team is dedicated to excellence and innovation.",
            link: "/services",
            linkText: "View All Services"
        },
        {
            id: 3,
            question: "How can I contact you?",
            answer: "You can reach us through our Contact page for any queries, collaborations, or project discussions. We're here to help!",
            link: "/contact",
            linkText: "Go to Contact Page"
        },
        {
            id: 4,
            question: "Are you hiring?",
            answer: "Yes! We are always looking for talented individuals to join our growing team. Check out our Careers page for the latest openings.",
            link: "/careers",
            linkText: "Explore Careers"
        },
        {
            id: 5,
            question: "Where can I find FAQs?",
            answer: "We have a dedicated FAQ page that covers common questions about our process, pricing, and more.",
            link: "/faq",
            linkText: "See All FAQs"
        }
    ];

    const handleQuestionClick = (q) => {
        setActiveResponse(q);
    };

    const resetChat = () => {
        setActiveResponse(null);
    };

    return (
        <div className="rio-bot-container">
            {/* Wish Bubble */}
            <AnimatePresence>
                {showWish && !isOpen && (
                    <motion.div 
                        className="rio-wish-bubble"
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        onClick={() => setShowWish(false)}
                    >
                        {greeting} How can I help?
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button 
                className="rio-trigger"
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowWish(false);
                    if (!isOpen) resetChat();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="rio-pulse"></div>
                {isOpen ? (
                    <span className="rio-trigger-icon">×</span>
                ) : (
                    <img src={avatarUrl} alt="Rio" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                )}
            </motion.button>

            {/* WhatsApp Trigger */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.a 
                        href="https://wa.me/9154175992" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="rio-whatsapp-trigger"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
                            alt="WhatsApp" 
                            className="rio-whatsapp-icon" 
                        />
                    </motion.a>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="rio-window"
                        initial={{ opacity: 0, scale: 0.8, y: 50, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    >
                        <div className="rio-header">
                            <div className="rio-header-info">
                                <div className="rio-avatar">
                                    <img src={avatarUrl} alt="Rio" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                </div>
                                <div className="rio-header-text">
                                    <h3>Rio</h3>
                                    <p>Online | Customer Support</p>
                                </div>
                            </div>
                            <button className="rio-close" onClick={() => setIsOpen(false)}>
                                ✕
                            </button>
                        </div>

                        <div className="rio-content">
                            <div className="rio-message">
                                <p>Hi! I'm Rio. How can I assist you today? Feel free to select a question below or browse our links.</p>
                            </div>

                            {activeResponse && (
                                <motion.div 
                                    className="rio-message rio-response"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <p>{activeResponse.answer}</p>
                                    <Link 
                                        to={activeResponse.link} 
                                        className="rio-footer"
                                        style={{ marginTop: '10px', display: 'block', padding: '0', border: 'none' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {activeResponse.linkText} →
                                    </Link>
                                </motion.div>
                            )}

                            {!activeResponse && (
                                <div className="rio-questions">
                                    {questions.map((q) => (
                                        <button 
                                            key={q.id} 
                                            className="rio-question-btn"
                                            onClick={() => handleQuestionClick(q)}
                                        >
                                            {q.question}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {activeResponse && (
                                <button 
                                    className="rio-question-btn" 
                                    style={{ marginTop: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.1)' }}
                                    onClick={resetChat}
                                >
                                    Back to Questions
                                </button>
                            )}
                        </div>

                        <div className="rio-footer">
                            <a href="#">Powered by Vzario AI</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RioBot;
