"use client";

import React, { useState } from "react";
import { Upload, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { API_URL } from "../../config";

export default function CustomOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    serviceType: "pickup",
    cakeWeight: "1kg",
    message: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const postData = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        postData.append(key, val);
      });
      if (selectedFile) {
        postData.append("inspirationImage", selectedFile);
      }

      // Send to Express Backend API
      const response = await fetch(`${API_URL}/api/custom-orders`, {
        method: "POST",
        body: postData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setWhatsappLink(result.whatsappUrl);
        // Automatically redirect to WhatsApp in 1.5 seconds
        setTimeout(() => {
          window.open(result.whatsappUrl, "_blank");
        }, 1500);
      } else {
        alert("Failed to submit custom order. Please try again.");
      }
    } catch (err) {
      console.error("Backend offline. Generating fallback WhatsApp link.");
      
      // Fallback WhatsApp link generation in the client
      const fallbackMsg = `Hi Vatika Sweets & Bakery,

I want to order a custom cake:
Name: ${formData.name}
Phone: ${formData.phone}
Occasion: ${formData.occasion}
Date: ${formData.date}
Type: ${formData.serviceType}
Weight: ${formData.cakeWeight}
Message: ${formData.message || "None"}
Description: ${formData.description}

Please share details.`;
      
      const link = `https://wa.me/919999999999?text=${encodeURIComponent(fallbackMsg)}`;
      setWhatsappLink(link);
      setSuccess(true);
      setTimeout(() => {
        window.open(link, "_blank");
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1EC] py-20 px-6 md:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs md:text-sm tracking-[0.6em] text-gold-luxury uppercase font-semibold mb-3 block">
          Bespoke Creations
        </span>
        <h1 className="font-serif-luxury text-4xl md:text-6xl uppercase tracking-wide text-text-luxury mb-4">
          Custom Orders Inquiry
        </h1>
        <p className="font-serif-luxury text-sm md:text-lg italic text-[#5B5B5B] max-w-xl mx-auto">
          Share your theme, flavor choices, and inspiration sketches. Our confectionery designers will bring your imagination to life.
        </p>
        <div className="w-24 h-[1px] bg-gold-luxury/40 mx-auto mt-6" />
      </div>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 text-center border border-gold-luxury/35 max-w-2xl mx-auto"
        >
          <div className="w-12 h-12 border border-gold-luxury/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-5 h-5 text-gold-luxury animate-pulse" />
          </div>
          <h2 className="font-serif-luxury text-2xl md:text-3xl text-text-luxury uppercase tracking-widest mb-4">
            Order Submitted!
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed mb-8">
            Your custom specifications have been registered. We are now redirecting you to WhatsApp to confirm your design details with our pastry chef.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gold-luxury hover:bg-gold-hover text-white px-8 py-3.5 font-button-luxury text-xs tracking-widest uppercase transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Open WhatsApp Manually</span>
          </a>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#FFF8F4] border border-border-luxury p-8 md:p-12 space-y-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter contact number"
                className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
              />
            </div>

            {/* Occasion */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                Occasion *
              </label>
              <select
                name="occasion"
                required
                value={formData.occasion}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider appearance-none"
              >
                <option value="">Select occasion</option>
                <option value="wedding">Wedding / Reception</option>
                <option value="anniversary">Anniversary</option>
                <option value="birthday">Birthday</option>
                <option value="baby-shower">Baby Shower</option>
                <option value="corporate">Corporate Event</option>
                <option value="other">Other Occasion</option>
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
              />
            </div>

            {/* Delivery/Pickup */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                Service Type *
              </label>
              <select
                name="serviceType"
                required
                value={formData.serviceType}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider appearance-none"
              >
                <option value="pickup">Store Pickup</option>
                <option value="delivery">Home Delivery</option>
              </select>
            </div>

            {/* Cake Weight */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
                Approximate Weight
              </label>
              <select
                name="cakeWeight"
                value={formData.cakeWeight}
                onChange={handleInputChange}
                className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider appearance-none"
              >
                <option value="1kg">1 Kg</option>
                <option value="2kg">2 Kg</option>
                <option value="3kg">3 Kg</option>
                <option value="5kg">5 Kg</option>
                <option value="above-5kg">More than 5 Kg</option>
              </select>
            </div>
          </div>

          {/* Inspiration Image Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
              Upload Inspiration Image
            </label>
            <div className="border border-dashed border-border-luxury bg-white/60 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gold-luxury transition-colors duration-300 relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-gold-luxury mb-2" />
              <span className="text-[10px] text-[#5B5B5B] uppercase tracking-wider">
                {selectedFile ? selectedFile.name : "Drag & Drop or Click to browse"}
              </span>
              <span className="text-[9px] text-[#5B5B5B]/60 uppercase tracking-widest mt-1">
                PNG, JPG or WEBP up to 5MB
              </span>
            </div>
            {filePreview && (
              <div className="mt-2 w-28 h-28 border border-border-luxury overflow-hidden">
                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Message on Cake */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
              Message on Cake (Optional)
            </label>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="e.g. Happy 25th Anniversary Mom & Dad"
              className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] tracking-widest uppercase text-[#5B5B5B] font-semibold">
              Design & Flavor Description *
              <span className="text-[9px] text-[#5B5B5B]/60 uppercase tracking-widest normal-case ml-1">
                (Specify colors, themes, structural requirements)
              </span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about your dream design, flavor preference (e.g. Belgian Chocolate, Red Velvet), and any custom details..."
              className="px-4 py-3 bg-white border border-border-luxury focus:outline-none focus:border-gold-luxury text-xs font-button-luxury tracking-wider leading-relaxed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold-luxury hover:bg-gold-hover disabled:bg-gold-luxury/60 py-4 font-button-luxury text-xs tracking-[0.25em] uppercase text-white font-medium transition-colors shadow-lg shadow-gold-luxury/10"
          >
            {submitting ? "Sending Specs..." : "Submit Spec & Open WhatsApp"}
          </button>
        </form>
      )}
    </div>
  );
}
