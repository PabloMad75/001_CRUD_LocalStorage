const formRegister = document.getElementById("form_register");
const nameInput = document.getElementById("nombre");
const addressInput = document.getElementById("direccionInput");
const mailInput = document.getElementById("mailInput");
const typeUserInput = document.getElementById("perfilusuario");
const estateUserInput = document.getElementById("estadousuario");
const tableBodyInput = document.getElementById("tablebody");

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

/*
estructura tabla
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
*/
// Función para Mostrar la lista de nombres en el Html
const viewData = () => {
	listHTML.innerHTML = "";
	const names = getInfoLocalStorage();
	names.forEach((name) => {


		// const listItem = document.createElement("li");
		// listItem.textContent = name.name;
		// const btnDelete = document.createElement("button");
		// btnDelete.textContent = "Borrar";
		// btnDelete.type = "Button";
		// btnDelete.id = "btnDelete";
		// btnDelete.className = "btn__borrar";
		// const btnEdit = document.createElement("button");
		// btnEdit.textContent = "Editar";
		// btnEdit.id = "btnEdit";
		// btnEdit.className = "btn__Edit";
		// btnEdit.type = "Button";
		// listItem.appendChild(btnEdit);
		// listItem.appendChild(btnDelete);
		// listHTML.appendChild(listItem);

		// Espera un clic en el boton editar para llamar a la funcion editName
		btnEdit.addEventListener("click", () => {
			editName(name.id);
		});
		// Espera un clic en el boton Borrar para llamar a la funcion deleteName
		btnDelete.addEventListener("click", () => {
			deleteName(name.id);
		});
	});
};

const loadData = ()=>{
    names=getInfoLocalStorage();
    tableBodyInput.innerHTML = '';
    names.forEach(name => {
    const row = `
      <tr>
        <td>${name.name}</td>
        <td class = colspan="2">${name.address}</td>
        <td>${name.mail}</td>
        <td>${name.typeUser}</td>
        <td>${name.estateUser}</td>
        <td>
          <button data-id="${name.id}" class="edit-btn">Editar</button>
          <button data-id="${name.id}" class="delete-btn">Eliminar</button>
        </td>
      </tr>
    `;
    tableBodyInput.innerHTML += row;

})
};

