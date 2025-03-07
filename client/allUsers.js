const div = document.getElementById("div");
let userId = null;
const loader = document.getElementById("loader");

const getAllUsers = async () => {
  loader.classList.remove("d-none");
  try {
    const response = await fetch("http://localhost:4211/getAllUser");
    const data = await response.json();
    // console.log(data);

    div.innerHTML = ""; // Clear previous content before updating

    if (data.length) {
      data?.map((item, index) => {
        div.innerHTML += `<div key=${index} class="col">
                                  <div class="service-card">
                                 
                                      <h3 id="name">Name: ${item.userName}</h3>
                                      <p id="email">Email: ${item.email}</p>
                                      <p id="age">Age: ${item.age}</p>
                                      <p id="contact">Contact: ${item.phoneNo}</p>
                                      <p id="password">Password: ${item.password}</p>
          
                                      <div class="mt-5">
                                          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick = "updateUser('${item._id}')">Edit User                                                    </button>                                        
                                          <button class="btn btn-danger" onclick = "handleDeleteUser('${item._id}')">Delete User</button>
                                      </div>
                                  </div>
                              </div>`;
      });
    } else {
      div.innerHTML = `<h2 class="text-center">No User Found!</h2>`;
    }
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.message}`,
    });
  } finally {
    loader.classList.add("d-none");
  }
};

getAllUsers();

const updateUser = (id) => {
  userId = id;
  return id; // Pass the id to handleUpdateUser
};

const userName = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const phoneNo = document.getElementById("phoneNo");
const password = document.getElementById("password");

const handleUpdateUser = async () => {
  if (!userId) return;

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
      });
      return;
    }
    const userObj = {
      userName: userName.value,
      email: email.value,
      age: age.value,
      phoneNo: phoneNo.value,
      password: password.value,
    };

    console.log(userObj);

    const response = await fetch(`http://localhost:4211/update/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    
    location.reload();

    await Swal.fire({
      position: "center",
      icon: "success",
      title: "User Updated Successfully!",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.message}`,
    });
  }
};

const handleDeleteUser = async (id) => {
  try {
    Swal.fire({
      title: "Are You Sure?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#28a745", // Green color (Bootstrap success color)
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await fetch(`http://localhost:4211/delete/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        location.reload();
      } else if (result.isDenied) {
      }
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.message}`,
    });
  }
};

window.getAllUsers = getAllUsers;
window.updateUser = updateUser;
window.handleUpdateUser = handleUpdateUser;
window.handleDeleteUser = handleDeleteUser;
