import React, { createContext, useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    visible: false,
  });

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
      <Snackbar
        open={alert.visible}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, visible: false })}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
