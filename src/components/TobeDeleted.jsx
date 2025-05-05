import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const GlobalApiTrigger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const turnstileRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // Load and render Turnstile
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
    //   setScriptLoaded(true);
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.REACT_APP_TURNSTILE_SITE_KEY || "0x4AAAAAABaVYnWlsS_i2pxG",
          action: "track-visit",
          callback: (receivedToken) => {
            setToken(receivedToken);
            console.log("Turnstile token:", receivedToken);
          },
          "error-callback": (err) => {
            console.error("Turnstile error:", err);
            setError("Failed to verify with Turnstile");
          },
          "expired-callback": () => {
            console.log("Turnstile token expired");
            window.turnstile.reset(turnstileRef.current);
          },
          theme: "light",
          size: "normal",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
      }
    };
  }, []);

  // Handle API call and route validation
  useEffect(() => {
    const validRoutes = ["/", "/about", "/landing", "/resume"];
    if (!validRoutes.includes(pathname)) {
      navigate("/", { replace: true });
      return;
    }

    const callApi = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const sourceVal = searchParams.get("src") || "direct";
        const campaignVal = searchParams.get("cmp") || "direct";

        let uuid = localStorage.getItem("uuid");
        if (!uuid) {
          uuid = uuidv4();
          localStorage.setItem("uuid", uuid);
        }
        localStorage.setItem("src", sourceVal);
        localStorage.setItem("cmp", campaignVal);

        if (window.location.search) {
          navigate(window.location.pathname, { replace: true });
        }

        const payload = {
          uuid,
          source: sourceVal,
          campaign: campaignVal,
          token, // Include Turnstile token if required
        };

        const baseUrl = process.env.REACT_APP_API_URL || "https://api.akshuakr.com";
        const res = await fetch(`${baseUrl}/api/v1/user/user-details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (err) {
        console.error("Global API call error:", err);
        setError("Failed to record user details");
      }
    };

    if (token) {
      callApi();
    }
  }, [pathname, navigate, token]);

  return (
    <div
      style={{
        width: "300px",
        height: "65px",
        margin: "10px 0",
        display: "none", // Hide widget if not meant to be visible
      }}
    >
      <div ref={turnstileRef} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GlobalApiTrigger;