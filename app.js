const inputsValidity = {
  user: false,
  email: false,
  message: false,
};

const form = document.querySelector("form");
const inputs = [...document.querySelectorAll("input, textarea")];
const iconVerif = [...document.querySelectorAll(".icone-verif")];
const errorMsg = document.querySelectorAll(".error-msg");
const contact = document.querySelector("#contact");
const contactLinks = document.querySelectorAll(".link");

contactLinks.forEach((contactLink) => {
  contactLink.addEventListener("click", handleContactLink);
});

function handleContactLink(e) {
  e.preventDefault();
  window.scrollTo({
    top: contact.offsetTop,
    behavior: "smooth",
  });
}

inputs.forEach((element) => {
  element.addEventListener("blur", handleInput);
});

form.addEventListener("input", handleInput);

function handleInput(e) {
  const index = inputs.indexOf(e.target);
  console.log(inputs);
  if (!verifInput(e)) {
    iconVerif[index].style.opacity = 1;
    inputs[index].style.borderColor = "#ff6f5b";
  } else {
    iconVerif[index].style.opacity = 0;
    inputs[index].style.borderColor = "#4ee1a0";
  }

  if (!e.target.value.length) {
    iconVerif[index].style.opacity = 0;
    errorMsg[index].style.display = "none";
    inputs[index].style.borderColor = "white";
  }
}

function verifInput(e) {
  switch (e.target.id) {
    case "name":
      return verifUser(e.target.value);
      break;
    case "email":
      return verifEmail(e.target.value);
      break;
    case "message":
      return verifMessage(e.target.value);
      break;
      return;
  }
}

function verifUser(user) {
  if (user.length < 3) {
    errorMsg[0].style.display = "flex";
    inputsValidity.user = false;
    return false;
  }
  errorMsg[0].style.display = "none";
  inputsValidity.user = true;
  return true;
}

function verifEmail(email) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errorMsg[1].style.display = "flex";
    inputsValidity.email = false;
    return false;
  }
  errorMsg[1].style.display = "none";
  inputsValidity.email = true;
  return true;
}

function verifMessage(message) {
  if (message.length) {
    errorMsg[2].style.display = "none";
    inputsValidity.message = true;
    return true;
  }
  errorMsg[2].style.display = "flex";
  inputsValidity.message = false;
  return false;
}

let isAnimating = false;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const keys = Object.keys(inputsValidity);
  const failedInput = keys.filter((key) => !inputsValidity[key]);
  console.log(failedInput);
  if (failedInput.length && !isAnimating) {
    isAnimating = true;
    form.classList.add("shake");

    failedInput.forEach((input) => {
      const index = keys.indexOf(input);
      iconVerif[index].style.opacity = 1;
      errorMsg[index].style.display = "flex";
      inputs[index].style.borderColor = "#ff6f5b";
    });

    setTimeout(() => {
      form.classList.remove("shake");
      isAnimating = false;
    }, 400);
  } else {
    window.open('mailto:adriencharpentier53@gmail.com?subject=Message from '+inputs[0].value+' - '+inputs[1].value+' &body='+inputs[2].value);
  }
});

const technoExperience = [...document.querySelectorAll(".techno")];
const projects = [
    document.querySelector(".header-projects"),
    ...document.querySelectorAll(".project-container")
];
const contactContainer = [document.querySelector(".contact-container")]

const animatedContents = [
  ...technoExperience,
  ...projects,
  ...contactContainer
];

const intersectionObserver = new IntersectionObserver(handleIntersect, {
  rootMargin: "-10%",
});

animatedContents.forEach((el) => intersectionObserver.observe(el));

function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      intersectionObserver.unobserve(entry.target);
    }
  });
}
