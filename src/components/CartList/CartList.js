import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const CartList = ({ cart, removeItem, total, totalQuantity, clear }) => {
  const columnas = [
    {
      name: "#",
      selector: (row, i) => <img width={50} height={50} src={row.img} alt="" />,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row, i) => row.name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Price",
      selector: (row, i) => "$" + row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row, i) => row.quantity,
      sortable: true,
    },
    {
      name: "Subtotal",
      selector: (row, i) => "$" + row.quantity * row.price,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => removeItem(row.id)}>
          Eliminar
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div>
        <DataTable
          columns={columnas}
          data={cart}
          noDataComponent={"No hay productos en el carrito"}
        />
      </div>
      <div className="mt-5 mb-5">
        {total > 0 && (
          <>
            <h2 className="text-center">
              Vas a comprar {totalQuantity} productos, el total a pagar es $
              {total}
            </h2>
            <div className="mt-5 d-flex justify-content-center">
              <button
                onClick={() => clear()}
                className="btn btn-lg btn-primary"
              >
                Vaciar carrito
              </button>
              <Link className="btn btn-lg btn-primary mx-5" to="/checkout">
                Finalizar compra
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartList;
