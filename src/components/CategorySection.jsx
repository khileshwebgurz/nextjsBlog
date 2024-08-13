"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";

const generateCaptcha = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const SectionFour = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    desc: "",
    captcha: "",
  });
  const [captcha, setCaptcha] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("-1");

  const categoryLinks = {
    "artificial-intelligence": "categories/artificial-intelligence",
    "blogging": "categories/blogging",
    "brand-marketing": "/categories/brand-marketing",
    "content-marketing": "/categories/content-marketing",
    "digital-marketing": "/categories/digital-marketing",
    "ecommerce": "/categories/ecommerce",
    "email-marketing": "/categories/email-marketing",
    "facebook-marketing": "/categories/facebook-marketing",
    "frameworks": "/categories/frameworks",
    "full-stack-javascript-development": "/categories/full-stack-javascript-development",
    "google-remarketing": "/categories/google-remarketing",
    "hubspot": "/categories/hubspot",
    "infographic": "/categories/infographic",
    "infusionsoft": "/categories/infusionsoft",
    "internet-marketing": "/categories/internet-marketing",
    "ios-app": "/categories/ios-app",
    "iphone-app-development": "/categories/iphone-app-development",
    "java-development": "/categories/java-development",
    "joomla": "/categories/joomla",
    "linkedin-marketing": "/categories/linkedin-marketing",
    "logo-design": "/categories/logo-design",
    "magento": "/categories/magento",
    "main-post": "/categories/main-post",
    "mobile-application-development": "/categories/mobile-application-development",
    "office-culture": "/categories/office-culture",
    "online-reputation-management": "/categories/online-reputation-management",
    "orm": "/categories/orm",
    "paid-marketing": "/categories/paid-marketing",
    "php": "/categories/php",
    "seo": "/categories/seo",
    "shopify": "/categories/shopify",
    "social-media-marketing": "/categories/social-media-marketing",
    "titanium-development": "/categories/titanium-development",
    "web-application-development": "/categories/web-application-development",
    "web-design": "/categories/web-design",
    "web-developments": "/categories/web-developments",
    "wordpress": "/categories/wordpress",
  };
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captcha !== captcha) {
     
      alert("Invalid CAPTCHA");
      return;
    }
    console.log("Form submitted:", formData);
  };

  const reloadCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData((prevData) => ({
      ...prevData,
      captcha: "",
    }));
  };

 

  
  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value !== "-1") {
      router.push(categoryLinks[event.target.value]);
    }
  };

  const handleInputData =(e)=>{
    setInputData(e.target.value)
  }
  console.log(inputData)

  return (
    <>
      <div className="categories">
        <input type="text" onChange={(e)=> handleInputData(e)}  placeholder="Search"></input>
        <h2>Categories</h2>
        <select
          name="cat"
          id="cat"
          className="postform"
          value={selectedCategory}
          onChange={handleChangeCategory}
        >
          <option value="-1">Select Category</option>
    
          {Object.keys(categoryLinks).map((category) => (
            <option key={category} value={category}>
              {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </option>
          ))}
         
        </select>
      </div>
      <form >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="message">Description:</label>
        <textarea
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
        />

        <PhoneInput
          country="ua"
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />

        <div className="captcha-container">
          <div className="captcha">{captcha}</div>
          <button
            type="button"
            className="reload-captcha"
            onClick={reloadCaptcha}
          >
            Reload CAPTCHA
          </button>
        </div>
        <label htmlFor="captcha">Enter CAPTCHA:</label>
        <input
          type="text"
          id="captcha"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </>
  );
};

export default SectionFour;
