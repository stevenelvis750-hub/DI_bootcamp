function calculateTip() {
  const billAmount = Number(document.getElementById("billAmt").value);
  const serviceQuality = Number(document.getElementById("serviceQual").value);
  let numberOfPeople = Number(document.getElementById("numOfPeople").value);
  const totalTip = document.getElementById("totalTip");
  const tipDisplay = document.getElementById("tip");

  if (serviceQuality === 0 || !billAmount) {
    alert("Please enter the service quality and bill amount.");
    return;
  }

  if (!numberOfPeople || numberOfPeople < 1) {
    numberOfPeople = 1;
    document.getElementById("numOfPeople").value = 1;
    document.getElementById("each").style.display = "none";
  }

  const total = (billAmount * serviceQuality) / numberOfPeople;
  const roundedTotal = total.toFixed(2);

  totalTip.style.display = "block";
  tipDisplay.textContent = roundedTotal;
}

document.getElementById("totalTip").style.display = "none";

// Email validation without regex
function validateEmailWithoutRegex(email) {
  if (!email || typeof email !== "string") return false;

  const atIndex = email.indexOf("@");
  if (atIndex <= 0) return false;

  const dotIndex = email.lastIndexOf(".");
  if (dotIndex <= atIndex + 1 || dotIndex === email.length - 1) return false;

  const localPart = email.slice(0, atIndex);
  const domainPart = email.slice(atIndex + 1);

  if (!localPart || !domainPart) return false;

  return true;
}

// Email validation with regex
function validateEmailWithRegex(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

const emailForm = document.getElementById("emailForm");
const emailResult = document.getElementById("emailResult");

if (emailForm) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("emailInput");
    const value = emailInput.value.trim();

    const isValid = validateEmailWithRegex(value);

    if (isValid) {
      emailResult.textContent = "Valid email address!";
      emailResult.style.color = "green";
    } else {
      emailResult.textContent = "Invalid email address!";
      emailResult.style.color = "red";
    }
  });
}

// Geolocation
const geoButton = document.getElementById("geoButton");
const geoResult = document.getElementById("geoResult");

if (geoButton) {
  geoButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
      geoResult.textContent = "Geolocation is not supported by this browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        geoResult.textContent = `Latitude: ${latitude}\nLongitude: ${longitude}`;
      },
      () => {
        geoResult.textContent = "Unable to get your location.";
      }
    );
  });
}
