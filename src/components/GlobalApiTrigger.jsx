import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const GlobalApiTrigger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const turnstileRef = useRef(null);
  // const [scriptLoaded, setScriptLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const widgetIdRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  // const [isHuman, setIsHuman] = useState(false);
  let isHuman = 0;

  // const baseUrl = "http://localhost:8000";
  const baseUrl = "https://api.akshuakr.com";

  // Load and render Turnstile
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        // Store the widget ID returned by render
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          // sitekey: "0x4AAAAAABaVYnWlsS_i2pxG",   // Demo Widget Key
          sitekey: "0x4AAAAAABasHn2iqYhkQVar",   // Portfolio Widget Key
          action: "track-visit",
          callback: (receivedToken) => {
            // () => setToken(receivedToken);
            setToken(receivedToken);
            setIsModalOpen(false);
            console.log("Turnstile receivedToken:", receivedToken);
            console.log("Turnstile token:", token);
          },
          "error-callback": (err) => {
            console.error("Turnstile error:", err);
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

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current); // Properly remove the widget
      }
    };
  }, []);

  // Handle Turnstile token and user details API calls
  useEffect(() => {
    if (!token) return; // Wait for token

    const sendTurnstileToken = async () => {
      try {
        const payload = {
          token,
          uuid: localStorage.getItem("uuid"),
        };

        const res = await fetch(`${baseUrl}/api/v1/user/turnstile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Turnstile API response was not ok");
        }

        const data = await res.json();

        // if (data.data.human == 1) {
        //   setIsHuman(true);
        // }

        isHuman = data.data.human;

        // setIsHuman(!!data.data.human); // Update isHuman based on response
      } catch (error) {
        console.error("Turnstile API call error:", error);
      }
    };

    const callUserDetailsApi = async () => {
      // Check if API was already called in this session
      if (sessionStorage.getItem("userDetailsCalled")) {
        console.log("User details API already called in this session");
        return;
      }

      try {
        const validRoutes = ["/", "/about", "/landing", "/resume"];
        if (!validRoutes.includes(pathname)) {
          navigate("/");
          return;
        }

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
          uuid: localStorage.getItem("uuid"),
          source: localStorage.getItem("src"),
          campaign: localStorage.getItem("cmp"),
          isHuman,
        };

        const res = await fetch(`${baseUrl}/api/v1/user/user-details`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("User details API response was not ok");
        }

        // Mark API as called in this session
        sessionStorage.setItem("userDetailsCalled", "true");
      } catch (error) {
        console.error("User details API call error:", error);
      }
    };

    // Execute both APIs sequentially
    const executeApis = async () => {
      await sendTurnstileToken(); // Wait for Turnstile API to complete
      await callUserDetailsApi(); // Then call user details API
    };

    executeApis();
  }, [token, navigate]); // Only depend on token and navigate

  // return null;
  return (
    <div>
      {/* <div style={{color: 'yellow', fontSize: '27px'}}>{isHuman}</div> */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              // backgroundColor: "#212121",
              backgroundColor: "#303030",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              width: "350px",
              textAlign: "center",
            }}
          >
            <h3>Verify Your Identity</h3>
            <div
              style={{
                width: "300px",
                height: "65px",
                margin: "20px auto",
              }}
            >
              <div ref={turnstileRef} />
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalApiTrigger;
