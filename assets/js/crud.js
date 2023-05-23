const formRegister = document.getElementById("form_register");
const nameInput = document.getElementById("nombre");
const addressInput = document.getElementById("direccionInput");
const mailInput = document.getElementById("mailInput");
const typeUserInput = document.getElementById("perfilusuario");
const estateUserInput = document.getElementById("estadousuario");

const btnSave = document.getElementById("btn_grabar");
const btnCancel = document.getElementById("btn_cancelar");
const btnUpdate = document.getElementById("btn_actualizar");
// const listHTML = document.getElementById("nameList");

btnSave.addEventListener("click", () => {
    if (nameInput.value.trim() === "" || addressInput.value.trim() === "" 
    || mailInput.value.trim() === "" || typeUserInput.value.trim() === ""
    || estateUserInput.value.trim() === "") {
        console.log("El campo está vacío");
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: `Debes completar toda la información requerida!`,
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        console.log("campos bien");
        const names = getInfoLocalStorage();
		const idName = Date.now();
		const name = {
			id: idName,
			name: nameInput.value,			
            address: addressInput.value,
			mail: mailInput.value,
			typeUser: typeUserInput.value,
			estateUser: estateUserInput.value
		};
		names.push(name);
		localStorage.setItem("names", JSON.stringify(names));
		formRegister.reset();

        // const names = getInfoLocalStorage();
        // const idName = generateId();
        // const name = {
        // 	id: idName,
        // 	name: nameInput.value,
        // };
        // names.push(name);
        // localStorage.setItem("names", JSON.stringify(names));
        // form_name.reset();
    }
    // viewData();
});

// Función para obtener la lista de nombres desde el Local Storage
const getInfoLocalStorage = () => {
	const namesString = localStorage.getItem("names");
	return JSON.parse(namesString) || [];
};



