/* Date: June 02, 2025
 * Author: Reajul Hasan Raju
 * Helper: To dynamically change the URL input box and Blocing Mode description
 * Source: https://github.com/ujaRHR/weblocker
 */

// Disable redirect url box on change
export function disableUrlInput(settings) {
  const redirectType = document.getElementsByName("redirectType");
  const redirectUrlInput = document.getElementById("redirectUrl");

  if (settings.redirectType === "default") {
    redirectUrlInput.disabled = true;
    redirectUrlInput.classList.add(
      "opacity-50",
      "line-through",
      "cursor-not-allowed"
    );
  }

  redirectType.forEach((type) => {
    if (type.value === settings.redirectType) {
      type.checked = true;
    }

    type.addEventListener("change", function () {
      const selectedValue = this.value;

      if (selectedValue === "default") {
        redirectUrlInput.disabled = true;
        redirectUrlInput.classList.add(
          "opacity-50",
          "line-through",
          "cursor-not-allowed"
        );
      } else {
        redirectUrlInput.disabled = false;
        redirectUrlInput.classList.remove(
          "opacity-50",
          "line-through",
          "cursor-not-allowed"
        );
      }
    });
  });
}

// Switching Block Mode Description on click
export function switchDescription(settings) {
  const blockMode = document.getElementsByName("blockMode");
  const blockModeDescription = document.getElementById("blockModeDescription");

  const descriptions = {
    smart: `<svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M24.378 5.385c-4.83.7-9.843 2.474-13.676 6.307c-5.99 5.99-6.742 14.675-2.579 20.302c2.337-4.222 5.5-8.124 8.714-11.487c6.42-6.718 13.475-11.724 16.113-13.453a2 2 0 1 1 2.192 3.346c-2.488 1.63-9.274 6.447-15.413 12.87c-3.426 3.584-6.524 7.54-8.618 11.62c2.683 1.863 5.989 2.639 9.378 2.309a2 2 0 0 1 .387 3.981c-3.977.387-7.984-.44-11.37-2.557c-.73 2.123-1.142 4.26-1.142 6.377a2 2 0 0 1-4 0c0-3.085.7-6.123 1.87-9.049C-.782 28.59.194 16.544 7.874 8.863c4.648-4.648 10.588-6.663 15.93-7.437c5.346-.775 10.252-.333 13.04.071a5.21 5.21 0 0 1 4.433 4.435c.466 3.222.99 9.308-.4 15.634a2 2 0 1 1-3.907-.859c1.243-5.659.782-11.205.348-14.202a1.21 1.21 0 0 0-1.048-1.05c-2.576-.372-7.064-.77-11.892-.07m3.993 20.003c1.497-.212 3.754-.388 7.13-.388s5.633.176 7.13.388c2.19.31 3.493 2.084 3.67 4.104c.107 1.21.2 2.766.2 4.508c0 4.859-2.566 9.443-6.939 11.693C38.22 46.384 36.72 47 35.501 47s-2.719-.616-4.061-1.307C27.067 43.443 24.5 38.86 24.5 34c0-1.742.093-3.297.2-4.508c.177-2.02 1.48-3.794 3.67-4.104m13.59 6.578a1.75 1.75 0 0 0-2.92-1.932l-4.023 6.08l-2.196-2.528a1.75 1.75 0 1 0-2.642 2.295l3.706 4.267a1.75 1.75 0 0 0 2.78-.182z" clip-rule="evenodd" /></svg><strong> Smart Mode:</strong> Blocks any partial matches from both the <em>Blocked Domains</em> and <em>Blocked Keywords</em> lists.`,
    strict: `<svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14 20H6.5q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.65 0 4.613 1.713T18.925 10q-.525 0-1.012.113t-.938.312q-.2-1.875-1.625-3.15T12 6Q9.925 6 8.463 7.463T7 11h-.5q-1.45 0-2.475 1.025T3 14.5t1.025 2.475T6.5 18H14zm3 0q-.425 0-.712-.288T16 19v-3q0-.425.288-.712T17 15v-1q0-.825.588-1.412T19 12t1.413.588T21 14v1q.425 0 .713.288T22 16v3q0 .425-.288.713T21 20zm1-5h2v-1q0-.425-.288-.712T19 13t-.712.288T18 14z" /></svg><strong> Strict Mode:</strong> Blocks anything that matches a domain from the <em>Blocked Domains</em> list.`,
  };

  blockModeDescription.innerHTML = descriptions[settings.blockMode];

  blockMode.forEach((mode) => {
    if (mode.value === settings.blockMode) {
      mode.checked = true;
    }

    mode.addEventListener("change", function () {
      const selectedValue = this.value;
      blockModeDescription.innerHTML = descriptions[selectedValue];
    });
  });
}
