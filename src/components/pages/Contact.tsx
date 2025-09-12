import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  // --- Animation Logic ---
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -200px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const getAnimClass = (_delay: number) =>
    `transition-all duration-700 ease-out ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  // --- Handlers ---
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your enquiry! We will get back to you soon.");
    setFormData({
      fullName: "",
      email: "",
      contactNumber: "",
      message: "",
    });
  };

  return (
    <div ref={sectionRef} className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />

        {/* Content styled like Home titles */}
        <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
          <p className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
            Reach Us
          </p>
          <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight animate-float">
              We’d Love to Hear From You
            </h1>
          </div>
          <p className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
            Questions, bookings or special requests — our team is ready to help.
          </p>
          <div className="flex items-center justify-center gap-3 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]">
            <motion.a
              href="tel:+914712220024"
              className="btn btn-primary px-6 py-3"
              aria-label="Call Now"
            >
              Call Now
            </motion.a>
            <motion.a
              href="#contact-form"
              className="btn btn-secondary px-6 py-3"
            >
              Get In Touch
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Title (pattern like Start section) */}
          <div className="text-center mb-12 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
              <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                Contact Details
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-heading relative animate-float">
              Visit, Call or Write
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
            </h2>
            <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
              We respond promptly to all enquiries. Choose the best way to reach
              us below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Details Cards */}
            <div className="space-y-8">
              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="card-base border border-border hover-lift"
              >
                <div className="flex items-start gap-4 p-8">
                  <div className="p-3 bg-action-accent/10 rounded-xl text-action-accent">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-2xl text-text-heading mb-3">
                      Address
                    </h3>
                    <p className="font-cormorant text-lg text-text-subtle leading-relaxed whitespace-pre-line">
                      Amritha Heritage Thycaud, Thiruvananthapuram –695014
                      Kerala, India
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="card-base border border-border hover-lift"
              >
                <div className="flex items-start gap-4 p-8">
                  <div className="p-3 bg-action-accent/10 rounded-xl text-action-accent">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-2xl text-text-heading mb-3">
                      Phone
                    </h3>
                    <p className="font-cormorant text-lg text-text-subtle leading-relaxed whitespace-pre-line">
                      +91 471 2220024 / 2220025 +91 471
                    </p>
                    <a
                      href="tel:+914712220024"
                      className="btn btn-primary mt-3 inline-flex"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card-base border border-border hover-lift"
              >
                <div className="flex items-start gap-4 p-8">
                  <div className="p-3 bg-action-accent/10 rounded-xl text-action-accent">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-2xl text-text-heading mb-3">
                      Email
                    </h3>
                    <p className="font-cormorant text-lg text-text-subtle leading-relaxed">
                      <a
                        href="mailto:info@amrithaheritage.com"
                        className="hover:text-action-accent transition-colors"
                      >
                        info@amrithaheritage.com
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="card-base border border-border hover-lift"
              >
                <div className="p-8">
                  <h3 className="font-playfair text-2xl text-text-heading mb-3">
                    Hours
                  </h3>
                  <p className="font-cormorant text-lg text-text-subtle leading-relaxed">
                    Front Desk: 24/7
                  </p>
                  <p className="font-cormorant text-lg text-text-subtle leading-relaxed">
                    Restaurant: 7:00 AM – 10:30 PM
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[600px] rounded-2xl overflow-hidden shadow-heritage-lg border border-border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.3!2d76.9!3d8.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjgnNDguMCJOIDc2wrA1NCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1629000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amritha Heritage Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Help Topics Section */}
      <section className="py-16 md:py-24 bg-background-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
              <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                How Can We Help?
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl text-text-heading relative animate-float">
              Popular Topics
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Room Availability",
                desc: "Check dates, room types and seasonal offers.",
              },
              {
                title: "Event Enquiries",
                desc: "Plan weddings, meetings and private gatherings.",
              },
              {
                title: "Dining & Specials",
                desc: "Menus, timings and chef’s recommendations.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-base border border-border hover-lift p-6"
              >
                <h3 className="font-playfair text-h4 text-text-heading mb-2">
                  {item.title}
                </h3>
                <p className="font-cormorant text-foreground-subtle">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="contact-form" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
              <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                Send Us a Message
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-text-heading">
              Enquiry Form
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-background rounded-2xl p-8 md:p-12 shadow-heritage-lg border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-poppins font-medium text-text-heading mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background-secondary focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent text-text-heading"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email and Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-poppins font-medium text-text-heading mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background-secondary focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent text-text-heading"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block font-poppins font-medium text-text-heading mb-2"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background-secondary focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent text-text-heading"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-poppins font-medium text-text-heading mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background-secondary focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent text-text-heading resize-vertical"
                  placeholder="Tell us about your requirements or ask any questions..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full btn btn-primary py-4 px-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Enquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
