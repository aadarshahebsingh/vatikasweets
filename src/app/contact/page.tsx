"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, Send, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate luxury API response
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F1EC] py-20 px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20">
        <span className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3 block">
          Get In Touch
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-6xl uppercase tracking-wide text-text-luxury mb-4">
          Contact Us
        </h1>
        <p className="font-serif-luxury text-sm md:text-lg italic text-[#5B5B5B] max-w-xl mx-auto">
          Planning an event, seeking corporate hampers, or wanting to share feedback? We look forward to hearing from you.
        </p>
        <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-[#FFF8F4] border border-border-luxury p-8 md:p-12 flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="font-serif-luxury text-2xl text-text-luxury uppercase tracking-widest mb-2">
              Send An Inquiry
            </h2>
            <p className="text-xs text-text-secondary mb-8 leading-relaxed">
              Fill out the form below and our relationship manager will get back to you within 24 business hours.
            </p>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FFF8F4] border border-gold-luxury/30 p-8 text-center flex flex-col items-center justify-center h-64"
              >
                <div className="w-12 h-12 border border-gold-luxury rounded-full flex items-center justify-center text-gold-luxury mb-4">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-xl uppercase tracking-wider text-text-luxury mb-2">
                  Message Sent
                </h3>
                <p className="text-xs text-text-secondary">
                  Thank you for reaching out. We have received your inquiry and will contact you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs text-gold-luxury font-button-luxury tracking-wider uppercase mt-6 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Aditi Sharma"
                      className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. aditi@domain.com"
                      className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
                    />
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Corporate Hamper Gifting"
                      className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[9px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry..."
                    className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gold-luxury hover:bg-gold-hover text-white disabled:bg-gold-luxury/60 py-4 font-button-luxury text-xs tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Contact Information & Map */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          {/* Details list */}
          <div className="bg-[#FFF8F4] border border-border-luxury p-8 md:p-12 space-y-6">
            <h2 className="font-serif-luxury text-2xl text-text-luxury uppercase tracking-widest mb-6">
              Flagship Boutique
            </h2>
            
            <ul className="space-y-6 text-xs text-text-secondary leading-relaxed">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-luxury shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-base uppercase text-text-luxury mb-1">Location</h4>
                  <p>Main Road, Hinoo, Ranchi, Jharkhand 834002</p>
                  <p className="text-[10px] text-gold-luxury font-semibold uppercase tracking-widest mt-1">Valet Parking Available</p>
                </div>
              </li>
              
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-luxury shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-base uppercase text-text-luxury mb-1">Store Hours</h4>
                  <p>Monday - Sunday: 9:00 AM - 10:00 PM</p>
                  <p className="text-[10px] text-gold-luxury uppercase tracking-widest mt-1">Open on Public Holidays</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gold-luxury shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-base uppercase text-text-luxury mb-1">Direct Lines</h4>
                  <p>Calls: +91 99999 99999</p>
                  <p>WhatsApp: +91 99999 99999</p>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold-luxury shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-base uppercase text-text-luxury mb-1">Email Inquiries</h4>
                  <p>orders@vatikasweets.com</p>
                  <p>info@vatikasweets.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Mini map frame */}
          <div className="relative aspect-[16/10] w-full border border-border-luxury overflow-hidden bg-white shadow-md flex-grow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.486259020359!2d85.31175657512196!3d23.334407478964724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e17b8df589b3%3A0xe54d3eb470716cb8!2sHinoo%2C%20Ranchi%2C%20Jharkhand%20834002!5e0!3m2!1sen!2sin!4v1717529898083!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vatika Sweets Hinoo Ranchi"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
