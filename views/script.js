// form
const form = document.getElementById("form-id");
let idValue = document.getElementById("hidden-for-ids");
const nameValue = document.getElementById("name-id");
const emailValue = document.getElementById("email-id");
const phoneValue = document.getElementById("phone-id");
const submitFormBtn = document.getElementById("form-submit");
submitFormBtn.addEventListener("click", onSubmit);

document.addEventListener("DOMContentLoaded", getAllItems);
async function getAllItems() {
  const response = await fetch(`http://localhost:3000/appointments`).then(
    (res) => res.json()
  );

  response.map((item) => {
    toUi(item);
  });
}
function onSubmit(e) {
  e.preventDefault();
  //form validation
  if (
    nameValue.value === "" ||
    emailValue.value === "" ||
    phoneValue.value === ""
  ) {
    alert("Fill All The Fields");
  } else {
    // make item objects
    const formObj = {
      name: nameValue.value,
      email: emailValue.value,
      phone: phoneValue.value,
      id: idValue.value,
    };

    // send this object to a function to send to the database
    postToDb(formObj);

    nameValue.value = "";
    emailValue.value = "";
    phoneValue.value = "";
  }
}

//function creates a post to the "" backend ""
async function postToDb(obj) {
  if (obj.id == "0") {
    try {
      const response = await fetch(`http://localhost:3000/appointments`, {
        method: "POST",
        body: JSON.stringify({
          name: obj.name,
          email: obj.email,
          phone: obj.phone,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      toUi(response);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await fetch(
        `http://localhost:3000/appointments/${obj.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: obj.name,
            email: obj.email,
            phone: obj.phone,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      toUi(obj);
    } catch (error) {
      console.log(error);
    }
  }
}

// function which creates objects in "" UI "" :: accepts an object
function toUi(obj) {
  const singleItem = document.createElement("div");
  const namePhone = document.createElement("div");
  const nameContainer = document.createElement("div");
  const phoneContainer = document.createElement("div");
  const emailContainer = document.createElement("div");
  const editDelete = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  //add required classes
  singleItem.classList.add(
    "rounded",
    "p-3",
    "d-flex",
    "justify-content-between",
    "single-item-cls",
    "my-1"
  );
  namePhone.classList.add("d-flex", "flex-column", "col-3", "px-2");
  nameContainer.classList.add(
    "text-white",
    "text-capitalize",
    "font-weight-bold"
  );

  phoneContainer.classList.add("text-light", "font-weight-light", "small");
  emailContainer.classList.add(
    "text-light",
    "col-6",
    "px-0",
    "small",
    "d-flex",
    "align-items-center"
  );
  editDelete.classList.add(
    "container",
    "col-3",
    "d-flex",
    "justify-content-center",
    "p-1"
  );

  editBtn.classList.add(
    "bg-warning",
    "border-0",
    "text-center",
    "rounded",
    "col-6",
    "px-2",
    "py-1",
    "m-1",
    "align-content-xl-center"
  );
  deleteBtn.classList.add(
    "bg-danger",
    "border-0",
    "text-center",
    "text-light",
    "rounded",
    "col-6",
    "px-2",
    "py-1",
    "m-1",
    "align-content-xl-center",
    "small"
  );

  //assigning inner values to all elements
  deleteBtn.innerHTML = "╳";
  editBtn.innerHTML = "✒";
  nameContainer.innerHTML = obj.name;
  phoneContainer.innerHTML = obj.phone;
  emailContainer.innerHTML = obj.email;

  //append all items in respective parent div container
  // button container
  editDelete.appendChild(editBtn);
  editDelete.appendChild(deleteBtn);
  // name and phone container
  namePhone.appendChild(nameContainer);
  namePhone.appendChild(phoneContainer);

  // append all parents divs, email container, button container to single item container div
  singleItem.appendChild(namePhone);
  singleItem.appendChild(emailContainer);
  singleItem.appendChild(editDelete);

  //append single item container to the target div in UI html page
  const targetDivInUi = document.getElementById("targetRootId");
  targetDivInUi.appendChild(singleItem);

  //assiging delete functionality to delete btn
  deleteBtn.addEventListener("click", deleteItem);
  async function deleteItem() {
    deleteBtn.parentElement.parentElement.remove();
    //delete from backend here by collecting id of the object obj.id
    console.log(obj.id);
    try {
      const response = await fetch(
        `http://localhost:3000/appointments/${obj.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert(`Successfully Deleted data of ${obj.email}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  editBtn.addEventListener("click", editItem);
  function editItem() {
    nameValue.value = obj.name;
    emailValue.value = obj.email;
    phoneValue.value = obj.phone;
    idValue.value = obj.id; // get the _id of the item and pass it here
    deleteBtn.parentElement.parentElement.remove();
  }
}
