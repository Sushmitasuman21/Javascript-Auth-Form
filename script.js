const navSignupBtn = document.getElementById("navSignupbtn");
const signupContainer = document.querySelector(".signup-container");
const signupbtn = document.querySelector("#signupbtn");

const navLoginBtn = document.querySelector("#navLoginbtn");
const loginContainer = document.querySelector(".login-container");
const loginbtn = document.querySelector("#loginbtn");

//! FOR SIGN UP FORM
navSignupBtn.addEventListener("click", () => {
  signupContainer.classList.toggle("active");
});

// Close the form when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === signupContainer) {
    signupContainer.classList.remove("active");
  }
});

//! FOR LOGIN FORM
navLoginBtn.addEventListener("click", () => {
  loginContainer.classList.toggle("active");
});

// Close the form when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === loginContainer) {
    loginContainer.classList.remove("active");
  }
});

//! signup form
signupbtn.addEventListener("click", (e) => {
  e.preventDefault(); // stops page reload

  // targetting input fields
  let username = document.querySelector("#signup-username").value;
  let email = document.querySelector("#signup-email").value;
  let password = document.querySelector("#signup-password").value;

  // creating new user
  let signupUser = {
    username,
    email,
    password,
  };
  console.log(signupUser);

  // send data to backend using fetch method
  fetch("http://localhost:6060/users", {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(signupUser),
  })
    .then(() => {
      console.log("data sent successfully");
      alert("signup successful");
    })
    .catch((err) => {
      console.log("something went wrong", err);
      alert("unable to signup");
    });
});

//! login form
loginbtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let email = document.querySelector("#login-email").value;
  let password = document.querySelector("#login-password").value;
  let allusers = await getAllSignupUser();
  console.log(allusers);

  let verifiedUser = allusers.find((user) => {
    return user.email === email && user.password === password;
  });

  if (verifiedUser) {
    console.log("login successful");
    window.location.href = "products.html";
    localStorage.setItem("id", verifiedUser.id);
  } else {
    console.log("please signup");
  }
});

// ! getAllSignupUser
async function getAllSignupUser() {
  let resp = await fetch("http://localhost:6060/users");
  return resp.json();
}
