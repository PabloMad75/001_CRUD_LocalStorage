const btnSave = document.getElementById("btn_grabar");
const formRegister = document.getElementById("form_register");

btnSave.addEventListener("click", () => {
  const nameInput = document.getElementById("nombre");
  const mailInput = document.getElementById("mailInput");
  const typeUserInput = document.getElementById("perfilusuario");
  const estateUserInput = document.getElementById("estadousuario");

  if (
    nameInput.validity.valueMissing ||
    mailInput.validity.valueMissing ||
    typeUserInput.validity.valueMissing ||
    estateUserInput.validity.valueMissing
  ) {
    warning();
  } else if (
    !nameInput.validity.valid ||
    !mailInput.validity.valid ||
    !typeUserInput.validity.valid ||
    !estateUserInput.validity.valid
  ) {
    invalidInput();
  } else {
    console.log("campos bien");
    const names = getInfoLocalStorage();
    const idName = Date.now();
    const name = {
      id: idName,
      name: nameInput.value,
      mail: mailInput.value,
      typeUser: typeUserInput.value,
      estateUser: estateUserInput.value,
    };
    names.push(name);
    localStorage.setItem("names", JSON.stringify(names));
    formRegister.reset();
    loadData();
    success();
  }
});
