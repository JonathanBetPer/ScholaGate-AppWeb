const API_URL = "https://scholagate.me/api/v1";
const jwt = localStorage.getItem("jwt");
const role = localStorage.getItem("role");

export async function login(nombreUsuario, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombreUsuario, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.json(); // Parsea la respuesta como JSON
  return data.token; // Devuelve solo el token
}

export async function getUsers() {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/usuarios`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Envía el JWT en el encabezado 'Authorization'
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.json();
  console.log(data); // Imprime los datos devueltos
  return data;
}

export async function getAlumnos() {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/alumnos`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Añade esta línea para enviar el token JWT en la cabecera 'Authorization
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.json();
  console.log(data); // Imprime los datos devueltos
  return data;
}

export async function getGrupos() {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/gruposInfo`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Añade esta línea para enviar el token JWT en la cabecera 'Authorization
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.json();
  console.log(data); // Imprime los datos devueltos
  return data;
}

export async function getReportes() {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/reportes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  let reportes = await response.json();

  // Reemplaza los campos idAlumno e idProfesor con los nombres del alumno y del profesor
  for (let reporte of reportes) {
    const alumno = await getAlumnoById(reporte.idAlumno);
    reporte.idAlumno = alumno.nombre;

    const usuario = await getUsuarioById(reporte.idUsuario);
    reporte.idUsuario = usuario.nombre;
  }

  console.log(reportes); // Imprime los reportes con los nombres del alumno y del profesor
  return reportes;
}

export async function getUsuarioActual() {
  const token = localStorage.getItem("jwt");
  try {
    const response = await fetch(`${API_URL}/usuario`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error del servidor: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo el usuario actual:", error);
    throw error;
  }
}
export async function getUsuarioById(id) {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/usuario/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Añade esta línea para enviar el token JWT en la cabecera 'Authorization
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.json();
  console.log(data); // Imprime los datos devueltos
  return data;
}

export async function getAlumnoById(id) {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/alumno/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.json();
  console.log(data); // Imprime los datos devueltos
  return data;
}

export async function cambioContraseña(password: string, token: string) {
  const response = await fetch(`${API_URL}/passwd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.text();
  return data;
}

export async function pedirCambioContraseña(idUsuario: number) {
  const token = localStorage.getItem("jwt"); // Obtiene el token del localStorage

  if (!token) {
    throw new Error("No se encontró el token en el localStorage");
  }

  const response = await fetch(`${API_URL}/pedirPaswd/${idUsuario}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error del servidor");
  }

  const data = await response.text();
  return data;
}


export async function deleteAlumnoById(id) {
  const token = localStorage.getItem("jwt");
  const response = await fetch(`${API_URL}/alumno/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Añade esta línea para enviar el token JWT en la cabecera 'Authorization
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error del servidor:", errorText);
    throw new Error(errorText || "Error del servidor");
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    const data = await response.json();
    console.log(data); // Imprime los datos devueltos
    return data;
  }
}