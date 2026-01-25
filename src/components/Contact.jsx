import "./Contact.css";
import "./subbut.css";
import $ from "jquery";
import { useEffect } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  useEffect(() => {
    $(".js-input").keyup(function () {
      if ($(this).val()) {
        $(this).addClass("not-empty");
      } else {
        $(this).removeClass("not-empty");
      }
    });

    // $(".submit").on("click", function () {

    // });
  }, []);

  function sendEmail(e) {
    e.preventDefault();
    
    try {
      var wrapper = $("#button-wrapper");
      if (wrapper.not(".checked")) {
        wrapper.addClass("checked");
        setTimeout(function () {
          wrapper.removeClass("checked");
        }, 8000);
      }
      
      emailjs
        .sendForm(
          "service_j9ovyx9",
          "template_jlm3o95",
          e.target,
          "qzrCzPgtdSbiIJl6v"
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result.text);
            emailjs
              .sendForm(
                "service_j9ovyx9",
                "template_rn5puj8",
                e.target,
                "qzrCzPgtdSbiIJl6v"
              )
              .then((rs) => {
                console.log("Confirmation email sent:", rs);
                // Clear form fields
                var ele = document.getElementsByClassName("input-text");
                for (var i = 0; i < ele.length; i++) {
                  ele[i].value = "";
                  $(ele[i]).removeClass("not-empty");
                }
                ele = document.getElementsByClassName("input-area");
                for (i = 0; i < ele.length; i++) {
                  ele[i].value = "";
                  $(ele[i]).removeClass("not-empty");
                }
                // Remove checked class after success
                setTimeout(function () {
                  wrapper.removeClass("checked");
                }, 2000);
              })
              .catch((error) => {
                console.error("Error sending confirmation email:", error);
                wrapper.removeClass("checked");
                alert("Message sent, but confirmation email failed. Please check the console for details.");
              });
          },
          (error) => {
            console.error("Error sending email:", error);
            wrapper.removeClass("checked");
            alert("Failed to send message. Please check the console for details or try again later.");
          }
        )
        .catch((error) => {
          console.error("Unexpected error:", error);
          wrapper.removeClass("checked");
          alert("An unexpected error occurred. Please try again later.");
        });
    } catch (error) {
      console.error("Error in sendEmail function:", error);
      var wrapper = $("#button-wrapper");
      wrapper.removeClass("checked");
      alert("An error occurred while processing your request. Please try again.");
    }
  }

  return (
    <div>
      <section className="get-in-touchw" id="contact">
        <h1 className="title">Get in touch</h1>
        <form
          className="contact-formw roww"
          onSubmit={sendEmail}
        >
          <div className="form-field col x-50">
            <input
              id="name"
              className="input-text js-input"
              name="user_name"
              type="text"
              required
            />
            <label className="label" htmlFor="name">
              Name
            </label>
          </div>
          <div className="form-field col x-50">
            <input
              id="email"
              className="input-text js-input"
              type="email"
              name="user_email"
              required
            />
            <label className="label" htmlFor="email">
              E-mail
            </label>
          </div>
          <div className="form-field col x-100">
            <textarea
              id="message"
              className="input-area js-input"
              type="text"
              name="message"
              required
            />
            <label className="label2" htmlFor="message">
              Message
            </label>
          </div>

          <div className="form-field col x-100 align-centerw">
            {/*  */}
            <input
              style={{ display: "none" }}
              id="submitcontact"
              type="submit"
              value="Submit"
            />
            <div id="button-wrapper">
              <a
                href="#"
                className="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const submitBtn = document.getElementById("submitcontact");
                  if (submitBtn) {
                    submitBtn.click();
                  }
                }}
              >
                Send
              </a>
              <div className="loader-wrapper">
                <span className="loader yellow"></span>
                <span className="loader pink"></span>
              </div>
              <span className="loader orange"></span>

              <div className="check-wrapper">
                <svg
                  version="1.1"
                  width="65px"
                  height="38px"
                  viewBox="0 0 64.5 37.4"
                >
                  <polyline className="check" points="5,13 21.8,32.4 59.5,5 " />
                </svg>
              </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              {" "}
              <defs>
                {" "}
                <filter id="goo">
                  {" "}
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />{" "}
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  />{" "}
                  <feBlend in="SourceGraphic" in2="goo" />{" "}
                </filter>{" "}
              </defs>
            </svg>
          </div>
        </form>

        {/* Connect with me section */}
        <div className="connect-section">
          <h2 className="connect-title">Connect with me</h2>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/niteesh-kamal-chaudhary/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img
                src="https://brandeps.com/icon-download/L/Linkedin-option-icon-vector-01.svg"
                alt="LinkedIn"
                className="social-icon"
              />
            </a>
            <a 
              href="https://www.linkedin.com/in/niteesh-kamal-chaudhary/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img
                src="https://brandeps.com/icon-download/F/Facebook-option-icon-vector-01.svg"
                alt="Facebook"
                className="social-icon"
              />
            </a>
            <a 
              href="https://twitter.com/Niteesh12857418" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img
                src="https://brandeps.com/icon-download/T/Twitter-icon-vector-19.svg"
                alt="Twitter"
                className="social-icon"
              />
            </a>
            <a 
              href="https://www.linkedin.com/in/niteesh-kamal-chaudhary/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <img
                src="https://brandeps.com/logo-download/I/Instagram-Icon-logo-vector-01.svg"
                alt="Instagram"
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
