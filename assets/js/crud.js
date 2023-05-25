const formRegister = document.getElementById("form_register");
const nameInput = document.getElementById("nombre");
const mailInput = document.getElementById("mailInput");
const typeUserInput = document.getElementById("perfilusuario");
const estateUserInput = document.getElementById("estadousuario");
const tableBodyInput = document.getElementById("tablebody");
const btnSave = document.getElementById("btn_grabar");
const btnCancel = document.getElementById("btn_cancelar");
const btnUpdate = document.getElementById("btn_actualizar");

const regularesExp = {
  mail: /^[a-z0-9]+(?:[-\._]?[a-z0-9]+)*@(?:[a-z0-9]+(?:-?[a-z0-9]+)*\.)+[a-z]+$/i,
  letras: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
};

// Una vez cargado el contenido del DOM, si existe visualizo la info del localstorage
document.addEventListener("DOMContentLoaded", (e) => {
  loadData();
});

btnSave.addEventListener("click", () => {
  if (
    nameInput.value.trim() === "" ||
    mailInput.value.trim() === "" ||
    typeUserInput.value.trim() === "" ||
    estateUserInput.value.trim() === ""
  ) {
    warning();
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

// Función para obtener la lista de nombres desde el Local Storage
const getInfoLocalStorage = () => {
  const namesString = localStorage.getItem("names");
  return JSON.parse(namesString) || [];
};

//Mensaje Sweet Alert Exito
const success = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Los datos fueron grabados exitosamente!",
    showConfirmButton: false,
    timer: 1500,
  });
};

//Mensaje Sweet Alert Error
const warning = () => {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: `Debes completar la información requerida!`,
    showConfirmButton: false,
    timer: 1500,
  });
};

// función con parametro para borrar elementos del local Storage
const deleteRecord = (id) => {
  console.log("funcion delete");
  const names = ([] = getInfoLocalStorage());
  names.forEach((name) => {
    if (name.id === id) {
      //Elimino del arreglo con splice y findIndex el elemento con el indice entregado por parametro, mostrando la consola
      console.log(
        names.splice(
          names.findIndex((name) => name.id === id),
          1
        )
      );
      console.log("me encontro");

      //Actualizo la info del localStorage con el arreglo actualizado, sin el elemento eliminado
      localStorage.setItem("names", JSON.stringify(names));

      //Reseteo el formulario, cargo los botones iniciales del formulario y la funcion viewData actualizar el html
      formRegister.reset();
      inactiveBtnUpdate();
      loadData();
    }
  });
};

// Muestra de información del LocalStorage
const loadData = () => {
  names = getInfoLocalStorage();
  tableBodyInput.innerHTML = "";
  names.forEach((name) => {
    const row = `
            <tr>
              <td class="w-25">${name.name}</td>
              <td class="w-25">${name.mail}</td>
              <td class="w-25">${name.typeUser}</td>
              <td class="">${name.estateUser}</td>
              <td class="w-15">
                <button data-id="${name.id}" onclick="editRecord(${name.id})" class="edit-btn btn btn-success btn-sm"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button data-id="${name.id}" onclick="deleteRecord(${name.id})" class="delete-btn btn btn-danger btn-sm"><i class="fa-solid fa-trash-can"></i> Borrar</button>
              </td>
            </tr>
          `;
    tableBodyInput.innerHTML += row;
  });
};

// Ocultar y mostrar botones
const activeBtnUpdate = () => {
  btnSave.classList.remove("active");
  btnSave.classList.add("inactive");
  btnUpdate.classList.add("active");
  btnUpdate.classList.remove("inactive");
};

const inactiveBtnUpdate = () => {
  btnSave.classList.add("active");
  btnSave.classList.remove("inactive");
  btnUpdate.classList.remove("active");
  btnUpdate.classList.add("inactive");
};

// función con parametro para editar elemento del localStorage
const editRecord = (id) => {
  const names = getInfoLocalStorage();

  // Buscar el objeto name, mediante la id (id)
  const nameToUpdate = names.find((name) => name.id === id);

  if (nameToUpdate) {
    activeBtnUpdate();
    nombre.value = nameToUpdate.name;
    mailInput.value = nameToUpdate.mail;
    perfilusuario.value = nameToUpdate.typeUser;
    estadousuario.value = nameToUpdate.estateUser;

    // Deshabilitar todos los botones btnEdit
    const btnEditList = document.getElementsByClassName("edit-btn");
    for (let i = 0; i < btnEditList.length; i++) {
      btnEditList[i].disabled = true;
    }

    // Remover el evento click anterior, si existe, para evitar acumulación de manejadores
    btnUpdate.removeEventListener("click", updateName);

    // Agregar el nuevo evento click al botón btnUpdate
    btnUpdate.addEventListener("click", updateName);

    function updateName() {
      if (
        nameInput.value.trim() === "" ||
        mailInput.value.trim() === "" ||
        typeUserInput.value.trim() === "" ||
        estateUserInput.value.trim() === ""
      ) {
        inactiveBtnUpdate();
        warning();
        // return;
      } else {
        nameToUpdate.name = nameInput.value;
        nameToUpdate.mail = mailInput.value;
        nameToUpdate.typeUser = typeUserInput.value;
        nameToUpdate.estateUser = estateUserInput.value;
        localStorage.setItem("names", JSON.stringify(names));
        success();
        formRegister.reset();
      }
      loadData();
      // Remover el evento click después de su ejecución
      btnUpdate.removeEventListener("click", updateName);
      showBtn();
      formRegister.reset();
      loadData();
      inactiveBtnUpdate();
    }
  }
};
// Mostrar nuevamente los botones btnEdit
const showBtn = () => {
  const btnEditList = document.getElementsByClassName("edit-btn");
  for (let i = 0; i < btnEditList.length; i++) {
    btnEditList[i].disabled = false;
  }
};

btnCancel.addEventListener("click", () => {
  console.log("se apreto el cancel");
  formRegister.reset();
  // loadData();
  inactiveBtnUpdate();
  showBtn();
});
