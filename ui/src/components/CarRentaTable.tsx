import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons/faCar";
import tableStyles from "./tableCars.module.css";

interface Rental {
  id: number;
  clientId: number;
  carId: number;
  rentalDate: string;
  returnDate: string;
  price: number;
  status: string;
}

interface TableRentalProps {
  rentals: Rental[];
}

const TableRental: React.FC<TableRentalProps> = ({ rentals }: TableRentalProps) => {
  return (
    <table className={tableStyles.table}>
      <thead>
        <tr>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> ID</span>
          </th>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> ID klienta</span>
          </th>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> ID auta</span>
          </th>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> Data wypożyczenia</span>
          </th>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> Data zwrotu</span>
          </th>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> Cena</span>
          </th>
          <th>
            <FontAwesomeIcon icon={faCar} />
            <span> Status</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rentals.map((rental: Rental) => (
          <tr key={rental.id}>
            <td>{rental.id}</td>
            <td>{rental.clientId}</td>
            <td>{rental.carId}</td>
            <td>{rental.rentalDate}</td>
            <td>{rental.returnDate}</td>
            <td>{rental.price}</td>
            <td>{rental.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRental;
