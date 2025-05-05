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

  // Load Turnstile script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.turnstile && !token) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: "0x4AAAAAABaVYnWlsS_i2pxG", // Replace with your Site Key
        action: "track-visit", // Optional: identify the action
        callback: (receivedToken) => {
          setToken(receivedToken);
          console.log(receivedToken);
          // callApi(receivedToken); // Call API with token
        },
        "error-callback": (error) => {
          console.error("Turnstile error:", error);
        },
        "expired-callback": () => {
          console.log("Turnstile token expired");
          window.turnstile.reset(turnstileRef.current);
        },
        theme: "light", // Options: 'light', 'dark', 'auto'
        size: "normal", // Options: 'normal', 'compact'
      });

      // Cleanup Turnstile on unmount
      return () => {
        if (window.turnstile) {
          window.turnstile.remove(turnstileRef.current);
        }
      };
    }
  }, []);

  useEffect(() => {
    const validRoutes = ["/", "/about", "/landing", "/resume"];

    if (!validRoutes.includes(pathname)) {
      navigate("/");
      return;
    }

    const callApi = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const sourceVal = searchParams.get("src") || "direct";
        const campaignVal = searchParams.get("cmp") || "direct";

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

        if (window.location.search) {
          navigate(window.location.pathname, { replace: true });
        }

        const payload = {
          uuid: localStorage.getItem("uuid"),
          source: localStorage.getItem("src"),
          campaign: localStorage.getItem("cmp"),
        };

        // const baseUrl = "http://localhost:8000";
        const baseUrl = "https://api.akshuakr.com";
        const res = await fetch(`${baseUrl}/api/v1/user/user-details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

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
  return (
    <div
      style={{
        width: "300px",
        height: "65px",
        margin: "10px 0",
      }}
    >
      <div ref={turnstileRef} />
    </div>
  );
};

export default GlobalApiTrigger;
