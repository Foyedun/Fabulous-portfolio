import { useState } from "react";
import { Col, Row, Alert } from "react-bootstrap";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const portfolioNews = [
    "Check out my latest project on modern UI design.",
    "Discover how I improved website performance by 30%.",
    "Learn about my recent contribution to an open-source project.",
    "Explore my new portfolio section featuring responsive design.",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || email.indexOf("@") === -1) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    const randomNews =
      portfolioNews[Math.floor(Math.random() * portfolioNews.length)];

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
    <div className="p-4 bg-gray-100 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold text-center">
          Subscribe to our Newsletter
          <br />
          & Never miss latest updates
        </h3>
        {status === "sending" && <Alert>Sending...</Alert>}
        {status === "error" && <Alert variant="danger">{message}</Alert>}
        {status === "success" && <Alert variant="success">{message}</Alert>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
