const userName = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const phoneNo = document.getElementById("phoneNo");
const password = document.getElementById("password");

const handleFormSubmit = async () => {
  try {
    if (
      !userName.value ||
      !email.value ||
      !age.value ||
      !phoneNo.value ||
      !password.value
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Must fill all the Empty Fields!",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }
    const userObj = {
      userName: userName.value.trim(),
      email: email.value.trim(),
      age: age.value.trim(),
      phoneNo: phoneNo.value.trim(),
      password: password.value.trim(),
    };

    const response = await fetch("https://server-liard-one-38.vercel.app//createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    Swal.fire({
      title: "User Created Successfully!",
      confirmButtonText: "Ok",
      confirmButtonColor: "#28a745", // Green color (Bootstrap success color)
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "./allUsers.html";
      }
    });

    userName.value = "";
    email.value = "";
    age.value = "";
    phoneNo.value = "";
    password.value = "";
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.message}`,
    });
  }
};

window.handleFormSubmit = handleFormSubmit;
