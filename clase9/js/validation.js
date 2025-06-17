document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("subscription-form");
	const fields = [
		{ id: "fullName", validate: validateFullName },
		{ id: "email", validate: validateEmail },
		{ id: "password", validate: validatePassword },
		{ id: "repeatPassword", validate: validateRepeatPassword },
		{ id: "age", validate: validateAge },
		{ id: "phone", validate: validatePhone },
		{ id: "address", validate: validateAddress },
		{ id: "city", validate: validateCity },
		{ id: "zip", validate: validateZip },
		{ id: "dni", validate: validateDNI }
	];

	fields.forEach(({ id, validate }) => {
		const input = document.getElementById(id);
		const error = document.getElementById("error-" + id);

		input.addEventListener("blur", () => {
			const message = validate(input.value);
			error.textContent = message;
		});

		input.addEventListener("focus", () => {
			error.textContent = "";
		});
	});

	// BONUS: actualizar "HOLA Nombre"
	const nameInput = document.getElementById("fullName");
	const formTitle = document.getElementById("form-title");

	nameInput.addEventListener("keydown", () => {
		setTimeout(() => {
			formTitle.textContent = "HOLA " + nameInput.value.toUpperCase();
		}, 0);
	});

	nameInput.addEventListener("focus", () => {
		formTitle.textContent = "HOLA " + nameInput.value.toUpperCase();
	});

	// ENVIAR
	form.addEventListener("submit", function (e) {
		e.preventDefault();
		let valid = true;
		let message = "";

		fields.forEach(({ id, validate }) => {
			const input = document.getElementById(id);
			const error = document.getElementById("error-" + id);
			const result = validate(input.value);
			if (result) {
				error.textContent = result;
				valid = false;
				message += `Error en ${id}: ${result}\n`;
			}
		});

		if (valid) {
			let datos = "";
			fields.forEach(({ id }) => {
				datos += `${id}: ${document.getElementById(id).value}\n`;
			});
			alert("Formulario enviado correctamente:\n\n" + datos);
		} else {
			alert("Revisá los errores antes de enviar:\n\n" + message);
		}
	});
});

// VALIDACIONES

function validateFullName(value) {
	return value.length > 6 && value.includes(" ") ? "" : "Debe tener más de 6 letras y al menos un espacio.";
}

function validateEmail(value) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(value) ? "" : "Formato de email inválido.";
}

function validatePassword(value) {
	const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return regex.test(value) ? "" : "Mínimo 8 caracteres con letras y números.";
}

function validateRepeatPassword(value) {
	const password = document.getElementById("password").value;
	return value === password ? "" : "Las contraseñas no coinciden.";
}

function validateAge(value) {
	return parseInt(value) >= 18 ? "" : "Debés tener al menos 18 años.";
}

function validatePhone(value) {
	const regex = /^\d{7,}$/;
	return regex.test(value) ? "" : "Solo números, mínimo 7 dígitos.";
}

function validateAddress(value) {
	return value.length >= 5 && value.includes(" ") ? "" : "Debe tener al menos 5 caracteres y un espacio.";
}

function validateCity(value) {
	return value.length >= 3 ? "" : "Debe tener al menos 3 caracteres.";
}

function validateZip(value) {
	return value.length >= 3 ? "" : "Debe tener al menos 3 caracteres.";
}

function validateDNI(value) {
	const regex = /^\d{7,8}$/;
	return regex.test(value) ? "" : "DNI inválido (7 u 8 dígitos).";
}


