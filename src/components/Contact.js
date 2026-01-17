import { useState, memo } from "react";
import Snackbar from "./Snackbar";

const Contact = () => {
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success",
  });

  return (
    <div
      className="contact-page-container"
      style={{
        background: "transparent",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        className="glow-orb"
        style={{
          top: "10%",
          left: "10%",
          width: "8rem",
          height: "8rem",
          background:
            "radial-gradient(circle, rgba(123, 104, 238, 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          bottom: "10%",
          right: "10%",
          width: "10rem",
          height: "10rem",
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      <div
        className="glow-orb"
        style={{
          top: "50%",
          right: "25%",
          width: "6rem",
          height: "6rem",
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />

      <div className="contact-form-container">
        <Form setSnackbar={setSnackbar} />
      </div>

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.show}
        onClose={() =>
          setSnackbar({ show: false, message: "", type: "success" })
        }
      />
    </div>
  );
};

export default memo(Contact);

const Form = ({ setSnackbar }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email.toLowerCase());
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (value.trim().length > 50)
          return "Name must be less than 50 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        if (value.length > 100) return "Email must be less than 100 characters";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        if (value.trim().length > 1000)
          return "Message must be less than 1000 characters";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const isFormValid = () => {
    const nameValid =
      formData.name.trim().length >= 2 && formData.name.trim().length <= 50;
    const emailValid =
      formData.email.trim() &&
      validateEmail(formData.email) &&
      formData.email.length <= 100;
    const messageValid =
      formData.message.trim().length >= 10 &&
      formData.message.trim().length <= 1000;
    return nameValid && emailValid && messageValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must be less than 100 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const emailData = {
          to: "princek9576@gmail.com",
          subject: `Portfolio Contact: Message from ${formData.name}`,
          html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                  <div style="background: linear-gradient(135deg, #7B68EE, #F97316); padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
                  </div>
                  <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">You have received a new message through your portfolio:</p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <p style="margin: 10px 0;"><strong style="color: #7B68EE;">Name:</strong> ${formData.name}</p>
                      <p style="margin: 10px 0;"><strong style="color: #7B68EE;">Email:</strong> ${formData.email}</p>
                    </div>
                    <div style="margin: 20px 0;">
                      <p style="margin-bottom: 10px;"><strong style="color: #F97316;">Message:</strong></p>
                      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #F97316;">
                        <p style="margin: 0; line-height: 1.6; color: #333;">${formData.message}</p>
                      </div>
                    </div>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                      <p style="color: #666; font-size: 14px;">Sent from your portfolio website</p>
                    </div>
                  </div>
                </div>
          `,
        };

        const response = await fetch(
          "https://formsubmit.co/princek9576@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              message: formData.message,
              _subject: emailData.subject,
              _template: "table",
              _captcha: "false",
            }),
          }
        );

        if (response.ok) {
          setShowSuccess(true);
          setFormData({ name: "", email: "", message: "" });
          setTouched({});
          setSnackbar({
            show: true,
            message: "Message sent successfully! I'll get back to you soon.",
            type: "success",
          });
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        const mailtoLink = `mailto:princek9576@gmail.com?subject=Portfolio Contact: Message from ${encodeURIComponent(
          formData.name
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.open(mailtoLink, "_blank");

        setSnackbar({
          show: true,
          message:
            "Email client opened! Please send the message through your email application.",
          type: "error",
        });
      }

      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
  };

  const formRowStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  if (showSuccess) {
    return (
      <div className="gradient-border-inner text-center">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.2)",
            marginBottom: "1rem",
          }}
        >
          <svg
            style={{ width: "2rem", height: "2rem", color: "#22c55e" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          Message Sent!
        </h3>
        <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
          We'll get back to you soon.
        </p>
        <button
          onClick={handleReset}
          style={{
            marginTop: "1rem",
            color: "#f97316",
            fontSize: "0.875rem",
            fontWeight: "500",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#fb923c")}
          onMouseOut={(e) => (e.target.style.color = "#f97316")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="gradient-border-inner">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4rem",
            height: "4rem",
            borderRadius: "1rem",
            background:
              "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(123, 104, 238, 0.2) 100%)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            marginBottom: "1rem",
          }}
        >
          <svg
            style={{ width: "2rem", height: "2rem" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#iconGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient
                id="iconGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          Get in Touch
        </h2>
        <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
          We'd love to hear from you
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        <div style={formRowStyle}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#d1d5db",
              marginBottom: "0.5rem",
            }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Your name"
            maxLength={50}
            className="input-glow"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: `1px solid ${
                errors.name && touched.name
                  ? "#ef4444"
                  : "rgba(147, 51, 234, 0.5)"
              }`,
              background: "rgba(88, 28, 135, 0.3)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s",
            }}
          />
          {errors.name && touched.name && (
            <span
              style={{
                color: "#ef4444",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
                display: "block",
              }}
            >
              {errors.name}
            </span>
          )}
        </div>

        <div style={formRowStyle}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#d1d5db",
              marginBottom: "0.5rem",
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="your@email.com"
            maxLength={100}
            className="input-glow"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: `1px solid ${
                errors.email && touched.email
                  ? "#ef4444"
                  : "rgba(147, 51, 234, 0.5)"
              }`,
              background: "rgba(88, 28, 135, 0.3)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s",
            }}
          />
          {errors.email && touched.email && (
            <span
              style={{
                color: "#ef4444",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
                display: "block",
              }}
            >
              {errors.email}
            </span>
          )}
        </div>

        <div style={formRowStyle}>
          <label
            htmlFor="message"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#d1d5db",
              marginBottom: "0.5rem",
            }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="What's on your mind?"
            rows={4}
            maxLength={1000}
            className="input-glow"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: `1px solid ${
                errors.message && touched.message
                  ? "#ef4444"
                  : "rgba(147, 51, 234, 0.5)"
              }`,
              background: "rgba(88, 28, 135, 0.3)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s",
              resize: "none",
            }}
          />
          {errors.message && touched.message && (
            <span
              style={{
                color: "#ef4444",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
                display: "block",
              }}
            >
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid()}
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "0.75rem",
            background:
              isSubmitting || !isFormValid()
                ? "#4B5563"
                : "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #f97316 100%)",
            backgroundSize: "200% auto",
            color: "white",
            fontSize: "1.125rem",
            fontWeight: "600",
            border: "none",
            cursor: isSubmitting || !isFormValid() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.3s",
            boxShadow:
              isFormValid() && !isSubmitting
                ? "0 8px 30px rgba(247, 147, 30, 0.4)"
                : "none",
          }}
          onMouseOver={(e) => {
            if (isFormValid() && !isSubmitting) {
              e.target.style.backgroundPosition = "right center";
              e.target.style.transform = "translateY(-2px)";
            }
          }}
          onMouseOut={(e) => {
            if (isFormValid() && !isSubmitting) {
              e.target.style.backgroundPosition = "left center";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          {!isSubmitting && (
            <svg
              style={{ width: "1.25rem", height: "1.25rem" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};
