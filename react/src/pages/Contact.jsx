import React, { useState } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CallIcon from "@mui/icons-material/Call";
import BusinessIcon from "@mui/icons-material/Business";
import { useAlert } from "../components/AlertProvider";

const Contact = () => {
  const showAlert = useAlert();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      contactForm.name === "" ||
      contactForm.email === "" ||
      contactForm.message === ""
    ) {
      return showAlert("All Fields are Required", "error");
    }

    if (!emailRegex.test(contactForm.email)) {
      return showAlert("Please enter a valid email", "error");
    }
    console.log(contactForm);
    showAlert("Your Message Received Successfully", "success");
    setContactForm({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <section className="bg-white " id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900  text-3xl sm:text-5xl">
              Get in Touch
            </h2>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-gray-600 ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
                doloribus distinctio voluptatem voluptatibus optio! Accusantium
                eveniet quae quis natus quam.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-900 text-gray-50">
                    <BusinessIcon />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                      Our Address
                    </h3>
                    <p className="text-gray-600 ">
                      2nd floor, Saffron Tower, Oppo. Centro mall, Panchvati.
                    </p>
                    <p className="text-gray-600 ">Ahmedabad, Gujarat</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-900 text-gray-50">
                    <CallIcon />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                      Contact
                    </h3>
                    <p className="text-gray-600 ">Mobile: +91 98765-43210</p>
                    <p className="text-gray-600 ">
                      Mail: wpvantage.support@sttl.com
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-900 text-gray-50">
                    <StorefrontIcon />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                      Want to be Seller
                    </h3>
                    <p className="text-gray-600 ">
                      Register on our Seller Site
                    </p>
                    <p className="text-gray-600 ">www.wpvantage.seller.com</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold ">
                Ready to Get Started?
              </h2>
              <form id="contactForm">
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                        name="email"
                        value={contactForm.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="textarea"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      id="textarea"
                      name="message"
                      cols="30"
                      rows="5"
                      placeholder="Write your message..."
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md  sm:mb-0"
                      value={contactForm.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                    onClick={hanldeSubmit}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
