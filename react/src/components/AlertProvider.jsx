import React, { createContext, useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// creating context to provide alert in whole app component
const AlertContext = createContext();

// creating hook to use alert in whole app component
export const useAlert = () => {
  return useContext(AlertContext);
};

// provider which provides alert functionality
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    visible: false,
  });

  // function which originally call the alert
  const showAlert = (message, severity) => {
    setAlert({
      message,
      severity,
      visible: true,
    });

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}

      {/* snack bar of material ui */}
      <Snackbar
        open={alert.visible}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, visible: false })}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        {/* alert component of material ui */}
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
