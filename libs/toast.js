/* Date: May 29, 2025
 * Author: Reajul Hasan Raju
 * Library: To show toast message for error, success, and info related activities
 * Source: https://github.com/ujaRHR/weblocker
 */

export function showToast(title, description, type = "success") {
  const colors = {
    success: "bg-green-700",
    error: "bg-red-700",
    info: "bg-blue-700",
  };
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-0 ${colors[type]} text-white px-6 mr-2 py-4 rounded-lg shadow-lg z-50`;
  toast.innerHTML = `
      <div class="font-semibold">${title}</div>
      <div class="text-sm">${description}</div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
