// src/pages/OrderList.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { Container, Spinner, Alert, Accordion, Table, Badge } from "react-bootstrap";

export default function OrderList({ user }) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }
    const url = `${API_BASE_URL}/order/list/${user.id}`;
    axios.get(url)
      .then(response => setOrders(response.data))
      .catch(error => setError("주문 내역을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" /> <div className="mt-2">불러오는 중...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container className="my-5">
        <h3>주문 내역</h3>
        <Alert className="mt-3">주문 내역이 없습니다.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">주문 내역</h2>

      <Accordion alwaysOpen>
        {orders.map((o, idx) => (
          <Accordion.Item eventKey={String(idx)} key={o.orderId}>
            <Accordion.Header>
              <div className="w-100 d-flex justify-content-between align-items-center">
                <div>
                  <strong>주문번호 #{o.orderId}</strong>{" "}
                  <Badge bg="secondary" className="ms-2">{o.status}</Badge>
                </div>
                <div>
                  <span className="me-3">{o.orderdate}</span>
                  <strong>{o.totalAmount.toLocaleString()} 원</strong>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Table hover responsive className="align-middle">
                <thead>
                  <tr className="text-center">
                    <th style={{width: 80}}>이미지</th>
                    <th>상품명</th>
                    <th style={{width: 140}}>단가</th>
                    <th style={{width: 100}}>수량</th>
                    <th style={{width: 160}}>합계</th>
                  </tr>
                </thead>
                <tbody>
                  {o.items.map((it, iidx) => (
                    <tr key={`${o.orderId}-${iidx}`} className="text-center">
                      <td>
                        <img
                          src={`${API_BASE_URL}/images/${it.image}`}
                          alt={it.name}
                          style={{width: 64, height: 64, objectFit: "cover", borderRadius: 8}}
                        />
                      </td>
                      <td className="text-start">{it.name}</td>
                      <td>{it.price.toLocaleString()} 원</td>
                      <td>{it.quantity}</td>
                      <td><strong>{(it.price * it.quantity).toLocaleString()} 원</strong></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
