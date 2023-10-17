import React from "react";

function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center my-5">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <div>
        <img 
         className="notFound-img"
          src="https://www.elmegatop.com/wp-content/uploads/gatito-triste.jpg"
          alt="Error 404"
        />
      </div>
    </div>
  );
}

export default NotFound;
