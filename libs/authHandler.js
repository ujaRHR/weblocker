/* Date: June 09, 2025
 * Author: Reajul Hasan Raju
 * Library: for auth management using extension's local storage
 * Source: https://github.com/ujaRHR/weblocker
 */

import { hashPassword } from "./hashPassword.js";
import { storage } from "./storage.js";
import { showToast } from "./toast.js";

// Scaffolding the Auth Handler
export const authHandler = {};

// Common DOM elements
const loginBody = document.getElementById("loginBody");
const mainBody = document.getElementById("mainBody");
const setPass = document.getElementById("setPass");
const updatePass = document.getElementById("updatePass");
const logout = document.getElementById("logout");
const toggleProtection = document.getElementById("toggleProtection");

authHandler.save = async () => {
  const warning = document.getElementById("passwordWarning");
  const pass = document.getElementById("password").value.trim();
  const cPass = document.getElementById("confirmPassword").value.trim();

  const passLength = pass.length;
  const cPassLength = cPass.length;

  if (passLength >= 6 && cPassLength >= 6) {
    if (pass === cPass) {
      const hashedPassword = await hashPassword(pass);

      const security = {
        enabled: true,
        auth: false,
        password: hashedPassword,
        nextLogin: Date.now(),
      };

      storage.setItem("security", security, (res) => {
        if (res) {
          warning.classList.add("hidden");
          toggleProtection.checked = true;
          showToast("Settings saved!", "Password has been set successfully");
          logout.classList.remove("hidden");
          setTimeout(() => {
            setPass.classList.add("hidden");
            updatePass.classList.remove("hidden");
          }, 1000);
        }
      });
    } else {
      warning.classList.remove("hidden");
      warning.innerHTML = "The passwords do not match, try again!";
    }
  } else {
    warning.classList.remove("hidden");
    warning.innerHTML = "Minimum 6 characters are required.";
  }
};

authHandler.update = async () => {
  const warning = document.getElementById("updateWarning");
  const currentPass = document.getElementById("currentPassword").value.trim();
  const newPass = document.getElementById("newPassword").value.trim();

  const cPassLength = currentPass.length;
  const nPassLength = newPass.length;

  if (cPassLength >= 6 && nPassLength >= 6) {
    storage.getItem("security", async (data) => {
      if (data != null) {
        const hashedPassword = data.password;
        const currentHashedPass = await hashPassword(currentPass);

        if (hashedPassword === currentHashedPass) {
          const newHashedPass = await hashPassword(newPass);

          const security = {
            enabled: true,
            auth: false,
            password: newHashedPass,
            nextLogin: Date.now(),
          };

          storage.setItem("security", security, (res) => {
            if (res) {
              warning.classList.add("hidden");
              showToast("Settings saved!", "Password has been updated.");
            }
          });
        } else {
          warning.classList.remove("hidden");
          warning.innerHTML = "Current password does not match!";
        }
      }
    });
  } else {
    warning.classList.remove("hidden");
    warning.innerHTML = "Minimum 6 characters are required.";
  }
};

authHandler.login = async () => {
  const warning = document.getElementById("loginWarning");
  let loginPass = document.getElementById("loginPassword").value.trim();

  if (loginPass.length >= 6) {
    storage.getItem("security", async (data) => {
      if (data != null) {
        const hashedPassword = data.password;
        const loginPassHashed = await hashPassword(loginPass);

        if (hashedPassword === loginPassHashed) {
          const security = {
            enabled: true,
            auth: true,
            password: hashedPassword,
            nextLogin: Date.now() + 60 * 60 * 1000,
          };

          storage.setItem("security", security, (res) => {
            if (res) {
              warning.classList.add("hidden");
              setTimeout(() => {
                loginBody.classList.add("hidden");
                mainBody.classList.remove("hidden");
                document.getElementById("loginPassword").value = "";
              }, 1000);
              showToast(
                "Login Successful!",
                "You can change the settings now."
              );
            }
          });
        } else {
          warning.classList.remove("hidden");
          warning.innerHTML = "Invalid password, try again!";
        }
      }
    });
  } else {
    warning.classList.remove("hidden");
    warning.innerHTML = "Minimum 6 characters are required.";
  }
};

authHandler.logout = async (security) => {
  security.auth = false;
  security.nextLogin = Date.now();

  storage.getItem("security", (data) => {
    if (data != null) {
      storage.setItem("security", security, (res) => {
        if (res) {
          setTimeout(() => {
            loginBody.classList.remove("hidden");
            mainBody.classList.add("hidden");
          }, 1000);
          showToast(
            "Logout Successful!",
            "You will be redirected to login page."
          );
        }
      });
    }
  });
};

authHandler.toggle = async () => {
  storage.getItem("security", (data) => {
    if (data != null) {
      const security = data || {
        enabled: false,
        auth: false,
        password: "",
        nextLogin: Date.now(),
      };

      if (security.enabled) {
        // Protection will be disabled
        security.enabled = false;
        toggleProtection.checked = false;
        logout.classList.add("hidden");
      } else {
        // Protection will be enabled
        security.enabled = true;
        toggleProtection.checked = true;
        logout.classList.remove("hidden");
      }

      storage.setItem("security", security, (res) => {
        if (res) {
          showToast(
            "Settings Saved!",
            "Password protection settings were updated!"
          );
        }
      });
    } else {
      setTimeout(() => {
        toggleProtection.checked = false;
      }, 1000);
      showToast(
        "Toggle Error!",
        "Set a password to enable protection!",
        "error"
      );
    }
  });
};
