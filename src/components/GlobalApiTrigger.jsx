import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const GlobalApiTrigger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const turnstileRef = useRef(null);
  const [turnstileToken, setTurnstileToken] = useState(null);
  // const [error, setError] = useState(null);

  //   console.log(`Global API Triger component rendered`);

  useEffect(() => {
    // Load Turnstile script
    const siteKey = "0x4AAAAAABaVYnWlsS_i2pxG";
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.turnstile) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          action: "site-access",
          mode: "managed", // Auto-verifies without user interaction
          callback: (token) => {
            setTurnstileToken(token);
            console.log(turnstileToken);
            // setError(null);
          },
          "error-callback": () => {
            // setError("Turnstile verification failed");
            setTurnstileToken(null);
          },
          "expired-callback": () => {
            // setError("Turnstile token expired");
            setTurnstileToken(null);
            // Optionally re-render widget
            window.turnstile.reset(turnstileRef.current);
          },
        });
      }
    };

    // Cleanup
    return () => {
      document.head.removeChild(script);
      if (window.turnstile) {
        window.turnstile.reset(turnstileRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const validRoutes = ["/", "/about", "/landing", "/resume"]; // Define your valid routes

    if (!validRoutes.includes(pathname)) {
      // console.log(`Invalid route`);
      navigate("/");
      return;
    }

    const callApi = async () => {
      try {
        // console.log(`callAPI function called`);
        // Parse query parameters from the current URL.
        const searchParams = new URLSearchParams(window.location.search);
        // console.log(searchParams);
        const sourceVal = searchParams.get("src") || "direct";
        // console.log(sourceVal);
        const campaignVal = searchParams.get("cmp") || "direct";
        // console.log(campaignVal);

        // Retrieve the UUID from localStorage or generate a new one.
        let uuid = localStorage.getItem("uuid");
        if (uuid) {
          localStorage.setItem("src", sourceVal);
          localStorage.setItem("cmp", campaignVal);
        } else {
          uuid = uuidv4();
          localStorage.setItem("uuid", uuid);
          localStorage.setItem("src", sourceVal);
          localStorage.setItem("cmp", campaignVal);
        }

        // Remove query parameters from the browser's address bar without reloading the page.
        if (window.location.search) {
          navigate(window.location.pathname, { replace: true });
        }

        // Prepare the payload for the API call
        // const payload = { uuid, source: sourceVal, campaign: campaignVal };

        const payload = {
          uuid: localStorage.getItem("uuid"), // always current value
          source: localStorage.getItem("src"),
          campaign: localStorage.getItem("cmp"),
        };

        // Send the POST request to your API endpoint.
        // const baseUrl = "http://localhost:8000";
        const baseUrl = "https://api.akshuakr.com";
        const res = await fetch(`${baseUrl}/api/v1/user/user-details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // console.log('RES',res);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        // const data = await res.json();
        // console.log("Global API call result data:", data);
      } catch (error) {
        console.error("Global API call error:", error);
      }
    };

    callApi();
  }, []);

  // return null;
  return <div ref={turnstileRef} id="turnstile-widget" style={{ display: "none" }} />;
};

export default GlobalApiTrigger;
