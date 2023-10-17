import React from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "./CartList.css";

const CartList = ({ cart, removeItem, total, totalQuantity, clear }) => {
  const data = cart;

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "img",
        Cell: (cell) => (
          <img
            style={{ objectFit: "contain" }}
            width={40}
            height={50}
            src={cell.row.original.img}
            alt=""
          />
        ),
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Precio",
        accessor: (row) => `$${row.price}`,
      },
      {
        Header: "Cantidad",
        accessor: "quantity",
      },
      {
        Header: "Subtotal",
        accessor: (row) => `$${row.quantity * row.price}`,
      },
      {
        Header: "Acción",
        accessor: "id",
        Cell: (cell) => (
          <svg
            style={{ cursor: "pointer" }}
            onClick={() => removeItem(cell.value)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-trash-fill text-danger mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        ),
      },
    ],
    [removeItem]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  console.log(data);

  return (
    <>
      {data.length === 0 ? (
        <h1 className="mt-4 text-center">No hay productos en el carrito</h1>
      ) : (
        <div className="container mt-5 table-responsive">
          <div>
            <table {...getTableProps()} className="table table-hover">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          style={{ paddingTop: "20px" }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-5 mb-5">
            {total > 0 && (
              <>
                <h2 className="text-center text-cart">
                  Vas a comprar {totalQuantity} productos, el total a pagar es $
                  {new Intl.NumberFormat("de-DE").format(total)}
                </h2>
                <div className="mt-5 d-flex justify-content-center gap-5">
                  <button
                    onClick={() => clear()}
                    style={{ background: "#1f487e" }}
                    className="btn btn-primary"
                  >
                    Vaciar carrito
                  </button>
                  <Link
                    style={{ background: "#1f487e" }}
                    className="btn btn-primary"
                    to="/checkout"
                  >
                    Finalizar compra
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartList;
