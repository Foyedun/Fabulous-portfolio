import { useState } from "react";
import contactImg from "../assets/img/contact-img.svg";
import TrackVisibility from "react-on-screen";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});
  const [formError, setFormError] = useState("");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formDetails.firstName ||
      !formDetails.lastName ||
      !formDetails.email ||
      !formDetails.phone ||
      !formDetails.message
    ) {
      setFormError("Please fill all fields before submitting.");
      return;
    }

    setFormError("");
    setButtonText("Sending...");

    const formData = new FormData();
    formData.append("service_id", "service_wzzyeea");
    formData.append("template_id", "template_zqfsh9n");
    formData.append("user_id", "hXc_gLqUAPzLw8Osa");
    formData.append("firstName", formDetails.firstName);
    formData.append("lastName", formDetails.lastName);
    formData.append("email", formDetails.email);
    formData.append("phone", formDetails.phone);
    formData.append("message", formDetails.message);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setButtonText("Send");
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: "Message sent successfully!" });
      } else {
        const errorData = await response.json();
        setButtonText("Send");
        setStatus({ success: false, message: `Error: ${errorData.error || "Failed to send the message."}` });
      }
    } catch (error) {
      setButtonText("Send");
      setStatus({ success: false, message: "An error occurred. Please try again later." });
      console.error("Error during form submission:", error);
    }
  };

  return (
    <section className="contact" id="connect">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 px-4">
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formDetails.firstName}
                        placeholder="First Name"
                        onChange={(e) => onFormUpdate("firstName", e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        value={formDetails.lastName}
                        placeholder="Last Name"
                        onChange={(e) => onFormUpdate("lastName", e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="email"
                        value={formDetails.email}
                        placeholder="Email Address"
                        onChange={(e) => onFormUpdate("email", e.target.value)}
                        className="p-2 border rounded"
                      />
                      <input
                        type="tel"
                        value={formDetails.phone}
                        placeholder="Phone No."
                        maxLength="11"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          onFormUpdate("phone", value);
                        }}
                        className="p-2 border rounded"
                      />
                    </div>
                    <textarea
                      rows="6"
                      value={formDetails.message}
                      placeholder="Message"
                      onChange={(e) => onFormUpdate("message", e.target.value)}
                      className="p-2 border rounded w-full mt-4"
                    ></textarea>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                      {buttonText}
                    </button>
                    {formError && <p className="text-red-500 mt-2">{formError}</p>}
                    {status.message && (
                      <p
                        className={`mt-2 ${status.success ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {status.message}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  );
};
