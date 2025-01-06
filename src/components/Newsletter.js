import { useState } from "react";  // Removed useEffect import
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');


  const portfolioNews = [
    "Check out my latest project on modern UI design.",
    "Discover how I improved website performance by 30%.",
    "Learn about my recent contribution to an open-source project.",
    "Explore my new portfolio section featuring responsive design."
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || email.indexOf("@") === -1) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Select a random news item
    const randomNews = portfolioNews[Math.floor(Math.random() * portfolioNews.length)];

    // Use EmailJS to send the email
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_wzzyeea",
          template_id: "template_zqfsh9n",
          user_id: "hXc_gLqUAPzLw8Osa",
          template_params: {
            email: email,
            news: randomNews,
          },
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing! A news item has been sent to your email.");
        setEmail("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
      console.error("Error during email sending:", error);
    }
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp" style={styles.newsletterBox}>
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3 style={styles.header}>Subscribe to our Newsletter<br />& Never miss latest updates</h3>
            {status === "sending" && <Alert>Sending...</Alert>}
            {status === "error" && <Alert variant="danger">{message}</Alert>}
            {status === "success" && <Alert variant="success">{message}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form onSubmit={handleSubmit}>
              <div className="new-email-bx" style={styles.emailBox}>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  style={styles.emailInput}
                />
                <button type="submit" style={styles.submitButton}>Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

const styles = {
  newsletterBox: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "600",
  },
  emailBox: {
    display: "flex",
    gap: "10px",
  },
  emailInput: {
    flexGrow: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
};

const mediaQueryStyles = `
  @media (max-width: 768px) {
    .new-email-bx input {
      width: 100%; /* Input field takes full width on small screens */
    }

    .new-email-bx button {
      width: 100%; /* Button takes full width on small screens */
      margin-top: 10px;
    }
  }
`;

export const GlobalStyles = () => {
  return (
    <style type="text/css">
      {mediaQueryStyles}
    </style>
  );
};
