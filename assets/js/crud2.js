// Recibo la información del formulario
const formRegister = document.getElementById("form_register");
const nameInput = document.getElementById("nombre");
const mailInput = document.getElementById("mailInput");
const typeUserInput = document.getElementById("perfilusuario");
const estateUserInput = document.getElementById("estadousuario");
const tablebody = document.getElementById("tablebody");
let editInfo;
let idData;
const btnSave = document.getElementById("btn_grabar");
const btnCancel = document.getElementById("btn_cancelar");
const btnUpdate = document.getElementById("btn_actualizar");

document.addEventListener("DOMContentLoaded", (e) => {
    //Carga en el HTML de datos almacenados en el localStorage
    loadData();
});

//Escucha del clic en el boton Grabar del formulario
btnSave.addEventListener('click', () => {
    if (validateForm()) {
        editInfo = false;
        saveData(editInfo);
    }
});

//Escucha del clic en el boton Grabar del formulario
btnUpdate.addEventListener('click', () => {
    if (validateForm()) {
        console.log("Entre en boton update");
        editInfo = true;
        saveData(editInfo);
    }
});

btnCancel.addEventListener("click", () => {
    console.log("se apreto el cancel");
    formRegister.reset();
    // loadData();
    inactiveBtnUpdate();
    showBtn();
});

function validateForm() {
    if (!nameInput.checkValidity() || !mailInput.checkValidity() || !typeUserInput.checkValidity() || !estateUserInput.checkValidity()) {
        formRegister.reportValidity();
        return false;
    } else {
        console.log(`valor de name ${nameInput.value}, ${mailInput.value}, ${typeUserInput.value}, ${estateUserInput.value} `);
        return true;
    }
};

// Muestra de información del LocalStorage
const loadData = () => {
    names = getInfoLocalStorage();
    console.log(names);
    tablebody.innerHTML = ""; // Reemplazar tableBodyInput por tablebody
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
        tablebody.innerHTML += row; // Reemplazar tableBodyInput por tablebody
    });
};

// Función para obtener la lista de nombres desde el Local Storage
const getInfoLocalStorage = () => {
    const namesString = localStorage.getItem("names");
    return JSON.parse(namesString) || [];
};

//Función para grabar la información dependiendo si es un actualización o nuevo registro
const saveData = (editing) => {
    const names = getInfoLocalStorage();
    const nameToUpdate = names.find((name) => name.id === idData);
    if (editing) {
        console.log("Editar registro");
        console.log("datos en nameToUpdate: "+nameToUpdate.name)

    } else {

        console.log("Nuevo registro");
        console.log("names");
        console.log(names);
        const idName = Date.now();
        const name = {
            id: idName,
            name: nameInput.value,
            mail: mailInput.value,
            typeUser: typeUserInput.value,
            estateUser: estateUserInput.value,
        };
        console.log(names);
        console.log(names.name);
        names.push(name);
        localStorage.setItem("names", JSON.stringify(names));
        formRegister.reset();
        loadData();
        success();
    }
};

// función con parametro para borrar elementos del local Storage
const deleteRecord = (id) => {
    console.log("funcion delete");
    const names = getInfoLocalStorage();
    names.forEach((name) => {
        if (name.id === id) {
            //Elimino del arreglo con splice y findIndex el elemento con el indice entregado por parametro, mostrando la consola
            console.log(names.splice(names.findIndex((name) => name.id === id), 1));
            console.log("me encontro");

            //Actualizo la info del localStorage con el arreglo actualizado, sin el elemento eliminado
            localStorage.setItem("names", JSON.stringify(names));

            //Reseteo el formulario, cargo los botones iniciales del formulario y la funcion viewData actualizar el html
            // inactiveBtnUpdate();
            loadData();
        }
    });
};

// función con parametro para editar elemento del localStorage
const editRecord = (id) => {
    const names = getInfoLocalStorage();

    // Buscar el objeto name, mediante la id (id)
    const nameToUpdate = names.find((name) => name.id === id);

    if (nameToUpdate) {
        idData=nameToUpdate.id;
        activeBtnUpdate();
        nombre.value = nameToUpdate.name;
        mailInput.value = nameToUpdate.mail;
        perfilusuario.value = nameToUpdate.typeUser;
        estadousuario.value = nameToUpdate.estateUser;
        hideBtn();
    }
};

const updateName =()=> {
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

// Mostrar nuevamente los botones btnEdit
const showBtn = () => {
    const btnEditList = document.getElementsByClassName("edit-btn");
    for (let i = 0; i < btnEditList.length; i++) {
        btnEditList[i].disabled = false;
    }
};

// Deshabilitar todos los botones btnEdit
const hideBtn = () => {
    const btnEditList = document.getElementsByClassName("edit-btn");
    for (let i = 0; i < btnEditList.length; i++) {
        btnEditList[i].disabled = true;
    }
};

