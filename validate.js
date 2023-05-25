function validateForm() {
    var formulario = document.getElementById("myForm");
    var nameInput = document.getElementById("nameInput");
    var emailInput = document.getElementById("emailInput");
  
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }
  
    // Si el formulario es válido, puedes realizar las acciones adicionales aquí.
    // Por ejemplo, enviar los datos del formulario a través de AJAX o realizar otras validaciones.
  
    console.log("El formulario es válido. Realizar acciones adicionales aquí.");
    console.log("nombre input "+nameInput.value +" valor mail "+emailInput.value);
    formulario.reset();
  }
  