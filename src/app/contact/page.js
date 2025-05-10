'use client';

import { useState } from 'react';
import { MailIcon, PhoneIcon, MapPin, Send, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace 'YOUR_ACCESS_KEY' with your actual Web3Forms API key
      const apiKey = 'efb442ee-84a7-48f8-96d8-47d78c8bed0f';
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Jumptern Contact Form'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Handle success
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        // Handle error
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <header className="mb-12 text-center neu-card p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Contact</span> Us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions about job opportunities, internships, or need career advice? 
          We're here to help you on your professional journey.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Contact Info */}
        <div className="neu-card p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full text-white">
                <MailIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Us</h3>
                <p className="text-gray-600 mb-1">For general inquiries:</p>
                <a href="mailto:info@jumptern.tech" className="text-purple-600 hover:underline">
                  info@jumptern.tech
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full text-white">
                <PhoneIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Call Us</h3>
                <p className="text-gray-600 mb-1">Mon-Fri from 9am to 5pm:</p>
                <a href="tel:+1234567890" className="text-purple-600 hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full text-white">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Visit Us</h3>
                <p className="text-gray-600">
                  123 Career Avenue<br />
                  Opportunity District<br />
                  New Delhi, India 100001
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com/xeeshann" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/shokeen-teeli-186871222/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/mxeeshann/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="neu-card p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          
          {submitStatus === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <Check size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-800">Message Sent Successfully!</h3>
                <p className="text-green-700 mb-4">Thank you for contacting us. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="text-red-600" />
                  <p className="text-red-700">{errorMessage || 'Something went wrong. Please try again.'}</p>
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="neu-input w-full p-3 rounded-lg focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="neu-input w-full p-3 rounded-lg focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="neu-input w-full p-3 rounded-lg focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="neu-input w-full p-3 rounded-lg focus:outline-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-colors 
                  ${isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      
     
      
    
    </div>
  );
}
