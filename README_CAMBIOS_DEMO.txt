CAMBIOS APLICADOS - DEMO ACADEMIA VIB

1. Acceso restringido para demo
- Se agrego assets/js/vib-demo-auth.js.
- Todas las paginas HTML cargan este script.
- Las paginas internas redirigen a admin-login.html si no existe una sesion valida.
- El unico correo permitido para iniciar sesion es: nicole@nickramen.com
- El registro queda deshabilitado para evitar que terceros creen cuentas durante el pitch.
- El boton de cerrar sesion limpia el acceso del demo.

IMPORTANTE:
Este bloqueo funciona para una maqueta HTML estatica y evita accesos casuales durante la demostracion. Para una aplicacion real en ASP.NET Core MVC/Azure, esta restriccion debe implementarse del lado del servidor con Authentication + Authorization, claims/roles y validacion del correo permitido, porque cualquier bloqueo hecho solo con JavaScript puede ser manipulado por alguien con conocimientos tecnicos.

2. Paleta de colores aplicada
Colores base:
- Verde oscuro: #008B72
- Verde claro: #00BFA0
- Azul oscuro: #42B8DE
- Azul claro: #88CFE3
- Naranja oscuro: #F57C00
- Naranja claro: #FFA126
- Gris oscuro: #626B72
- Gris claro: #879199

3. Logo real reemplazable
- Se removio el icono + texto en el logo principal/sidebar/login.
- Se dejo: <img src="" alt="Academia VIB" class="...logo-img" />
- Cuando tengas el logo real, solo coloca la ruta dentro de src="".
