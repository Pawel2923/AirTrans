import http from "../http-common";
import { Filter, Sort } from "../assets/Data";

export interface Ticket {
  class: string;
  seat_number: string;
  price: number;
  status?: "PURCHASED" | "EXPIRED" | "USED" | "REFUNDED" | "CANCELLED";
  Users_id: number;
  Flight_id: string;
  Gates_id: number;
}

class TicketsService {
  getAll = (
    page: number = 1,
    limit?: number,
    filter?: Filter[],
    sort?: Sort
  ) => {
    let url = `/tickets?page=${page}`;

    if (limit) {
      url += `&limit=${limit}`;
    }

    if (filter) {
      // Check if filter is valid
      filter.forEach((f) => {
        if (!f.by || !f.value) {
          throw new Error("Invalid filter");
        }
      });

      url += `&filter=${JSON.stringify(filter)}`;
    }

    if (sort) {
      // Check if sort is valid
      if (!sort.by) {
        throw new Error("Invalid sort");
      }

      url += `&sort=${JSON.stringify(sort)}`;
    }

    return http.get(url, { withCredentials: true });
  };

  getById(id: number) {
    return http.get(`/tickets?filter=[{"by":"t.id","value":"${id}"}]`, {
      withCredentials: true,
    });
  }

  getByUserEmail(email: string) {
    return http.get(`/tickets?filter=[{"by":"u.email","value":"${email}"}]`, {
      withCredentials: true,
    });
  }

  getIds() {
    return http.get("/tickets/ids", { withCredentials: true });
  }

  create(ticket: Ticket) {
    return http.post("/tickets", ticket, { withCredentials: true });
  }

  updateStatus(id: number, status: string) {
    return http.patch(`/tickets/${id}`, { status }, { withCredentials: true });
  }
}

export default new TicketsService();
