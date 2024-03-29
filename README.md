# Biblioteca de Bestsellers del NYT

Utilizando la [API del NYTimes](https://developer.nytimes.com/apis) vamos a crear una biblioteca de los libros más vendidos por temática


Ofreceremos al cliente un dashboard con la listas disponibles en *[Books API](https://developer.nytimes.com/docs/books-product/1/overview)*.


<img src="./assets/Screenshot from 2023-04-12 21-38-48.png" alt="">

[Echa un vistazo!](https://anairanzo.github.io/library/)

**Especificaciones(Fase I):**
- Incluir una animación mientras esperamos la carga del contenido.
- Al cargar la web deben de aparecer todas las listas con los siguientes datos:
	- Nombre completo de la lista
	- Fecha del libro más antiguo en la lista
	- Fecha del último libro incorporado
	- Frecuencia de actualización
	- Link para poder cargar la lista
- Al pinchar en el link de una lista especifica, el DOM debe cambiar e incluir los siguientes datos:
- Un botón para *volver atras* y recargar la disposición anterior
- Los libros deben estar organizados según el orden de la lista oficial
- Incluir 
    - Carátula del libro
    - Cantidad de semanas que lleva en la lista
    - Descripción
    - Titulo y la posición que ocupa en la lista ( #1 titulo.... #2 titulo....)
    - Link para poder comprar el libro en amazon (debe abrirse en otra pestaña)
 <img src="./assets/Screenshot from 2023-04-12 21-39-06.png" alt="">
 
**Especificaciones (Fase II - Firebase):**

- Autenticación con Firebase auth: Los usuarios que se autentiquen podrán guardar sus favoritos
- Añadir un botón de favoritos en cada libro
- Los favoritos se guardarán en en Firebase Firestore
- Necesitarás una vista extra en el front para que cada usuario pueda ver sus favoritos

**Extra (Fase III - Firebase cloud Storage):**

- Los usuarios que se registren podrán subir su foto al sistema
- La foto se guardará en Firebase Cloud Storage y la URL de la foto en el documento del usuario en Firebase Firestore
