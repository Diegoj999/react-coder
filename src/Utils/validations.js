export function validatePasswords(values) {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.!\\-_$])[a-zA-Z0-9.!\\-_$]{8,}$/;

  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "*The old password field is required";
  } else if (!passwordRegex.test(values.oldPassword)) {
    errors.oldPassword = "*The old password is invalid";
  }

  if (!values.newPassword) {
    errors.newPassword = "*The new password field is required";
  } else if (!passwordRegex.test(values.newPassword)) {
    errors.newPassword = "*The new password is invalid";
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = "*The repeat password field is required";
  } else if (!passwordRegex.test(values.repeatPassword)) {
    errors.repeatPassword = "*The repeat password is invalid";
  }


  return errors;
}

export const errorMessages = {
  "auth/wrong-password": "La contraseña es incorrecta",
  "auth/user-not-found": "Usuario no encontrado, regístrate",
  "auth/weak-password" : "Contraseña muy débil",
  "auth/email-already-in-use" : "Este e-mail ya está en uso",


  // Agrega más mensajes de error según sea necesario
  // ...
};

