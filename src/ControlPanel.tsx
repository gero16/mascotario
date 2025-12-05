import { useEffect, useMemo, useState } from 'react';
import './ControlPanel.css';

const API_BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

type OrderStatus = 'pendiente' | 'pagada' | 'preparando' | 'enviada' | 'entregada' | 'cancelada';
type NotificationType = 'pago' | 'stock' | 'mensaje' | 'envio';

interface Order {
  id: string;
  cliente: string;
  ciudad?: string;
  fecha?: string;
  estado: OrderStatus;
  total: number;
  articulos?: number;
  canal?: string;
}

interface User {
  id: string;
  nombre: string;
  email: string;
  ciudad: string;
  registrado: string;
  pedidos: number;
  ticketPromedio: number;
  estado: 'activo' | 'inactivo';
}

interface Notification {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: NotificationType;
  visto: boolean;
  prioridad: 'alta' | 'media' | 'baja';
}

type OrderFilter = OrderStatus | 'todas';
type NotificationFilter = NotificationType | 'todas';

const FALLBACK_ORDERS: Order[] = [
  {
    id: 'ORD-10423',
    cliente: 'María Fernanda',
    ciudad: 'CABA',
    fecha: '2025-02-05T13:42:00Z',
    estado: 'pendiente',
    total: 48200,
    articulos: 4,
    canal: 'Web',
  },
  {
    id: 'ORD-10418',
    cliente: 'Rodolfo Gómez',
    ciudad: 'Rosario',
    fecha: '2025-02-04T18:25:00Z',
    estado: 'pagada',
    total: 35800,
    articulos: 2,
    canal: 'Instagram',
  },
  {
    id: 'ORD-10403',
    cliente: 'Carolina Ortiz',
    ciudad: 'Mendoza',
    fecha: '2025-02-03T16:05:00Z',
    estado: 'preparando',
    total: 61200,
    articulos: 5,
    canal: 'WhatsApp',
  },
  {
    id: 'ORD-10388',
    cliente: 'Natalia Funes',
    ciudad: 'Córdoba',
    fecha: '2025-02-02T15:36:00Z',
    estado: 'enviada',
    total: 27900,
    articulos: 3,
    canal: 'Web',
  },
  {
    id: 'ORD-10380',
    cliente: 'Juan Martín',
    ciudad: 'Mar del Plata',
    fecha: '2025-02-01T13:20:00Z',
    estado: 'entregada',
    total: 71500,
    articulos: 6,
    canal: 'Web',
  },
  {
    id: 'ORD-10372',
    cliente: 'Lucía Pereyra',
    ciudad: 'La Plata',
    fecha: '2025-01-31T11:18:00Z',
    estado: 'cancelada',
    total: 18900,
    articulos: 1,
    canal: 'Instagram',
  },
];

const FALLBACK_USERS: User[] = [
  {
    id: 'USR-302',
    nombre: 'María Fernanda',
    email: 'mariaf@correo.com',
    ciudad: 'CABA',
    registrado: '2024-11-23T18:10:00Z',
    pedidos: 6,
    ticketPromedio: 21500,
    estado: 'activo',
  },
  {
    id: 'USR-281',
    nombre: 'Rodolfo Gómez',
    email: 'rgomez@correo.com',
    ciudad: 'Rosario',
    registrado: '2025-01-12T12:35:00Z',
    pedidos: 3,
    ticketPromedio: 16700,
    estado: 'activo',
  },
  {
    id: 'USR-260',
    nombre: 'Carolina Ortiz',
    email: 'caro.ortiz@correo.com',
    ciudad: 'Mendoza',
    registrado: '2024-09-03T09:05:00Z',
    pedidos: 8,
    ticketPromedio: 19800,
    estado: 'activo',
  },
  {
    id: 'USR-255',
    nombre: 'Natalia Funes',
    email: 'nfunes@correo.com',
    ciudad: 'Córdoba',
    registrado: '2025-02-02T14:10:00Z',
    pedidos: 1,
    ticketPromedio: 27900,
    estado: 'activo',
  },
  {
    id: 'USR-249',
    nombre: 'Juan Martín',
    email: 'juan.martin@correo.com',
    ciudad: 'Mar del Plata',
    registrado: '2024-07-19T16:50:00Z',
    pedidos: 10,
    ticketPromedio: 22400,
    estado: 'activo',
  },
  {
    id: 'USR-230',
    nombre: 'Lucía Pereyra',
    email: 'lucia.p@correo.com',
    ciudad: 'La Plata',
    registrado: '2025-01-05T10:25:00Z',
    pedidos: 2,
    ticketPromedio: 18900,
    estado: 'inactivo',
  },
];

const FALLBACK_NOTIFICATIONS: Notification[] = [
  {
    id: 'NT-01',
    titulo: 'Pago acreditado',
    descripcion: 'La orden ORD-10423 fue acreditada por Mercado Pago.',
    fecha: '2025-02-05T14:22:00Z',
    tipo: 'pago',
    visto: false,
    prioridad: 'alta',
  },
  {
    id: 'NT-02',
    titulo: 'Stock bajo',
    descripcion: 'Quedan 6 unidades de Botella HydraDuo.',
    fecha: '2025-02-05T09:10:00Z',
    tipo: 'stock',
    visto: false,
    prioridad: 'media',
  },
  {
    id: 'NT-03',
    titulo: 'Despacho coordinado',
    descripcion: 'Andreani retirará los envíos programados a las 17:00hs.',
    fecha: '2025-02-04T17:15:00Z',
    tipo: 'envio',
    visto: true,
    prioridad: 'media',
  },
  {
    id: 'NT-04',
    titulo: 'Mensaje recibido',
    descripcion: 'Cliente Verónica pidió combinar envío con pedido anterior.',
    fecha: '2025-02-04T11:35:00Z',
    tipo: 'mensaje',
    visto: false,
    prioridad: 'baja',
  },
];

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' });
const dateTimeFormatter = new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' });

const ORDER_FILTERS: OrderFilter[] = ['todas', 'pendiente', 'pagada', 'preparando', 'enviada', 'entregada', 'cancelada'];
const NOTIFICATION_FILTERS: NotificationFilter[] = ['todas', 'pago', 'envio', 'stock', 'mensaje'];

const STATUS_INFO: Record<OrderStatus, { label: string; tone: 'warning' | 'info' | 'success' | 'neutral' | 'danger' }> = {
  pendiente: { label: 'Pendiente', tone: 'warning' },
  pagada: { label: 'Pagada', tone: 'info' },
  preparando: { label: 'Preparando', tone: 'info' },
  enviada: { label: 'Enviada', tone: 'info' },
  entregada: { label: 'Entregada', tone: 'success' },
  cancelada: { label: 'Cancelada', tone: 'danger' },
};

const NOTIFICATION_INFO: Record<NotificationType, { label: string; icon: string }> = {
  pago: { label: 'Pagos', icon: '💳' },
  stock: { label: 'Inventario', icon: '📦' },
  mensaje: { label: 'Mensajes', icon: '💬' },
  envio: { label: 'Envíos', icon: '🚚' },
};

const formatCurrency = (value: number) => currencyFormatter.format(value);
const safeFormatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? '—' : dateFormatter.format(date);
};
const safeFormatDateTime = (value: string | Date) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.valueOf()) ? '—' : dateTimeFormatter.format(date);
};

const getOrderDateValue = (order: Order) => {
  if (!order.fecha) return 0;
  const timestamp = new Date(order.fecha).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const normalizeOrders = (data: unknown): Order[] => {
  if (!Array.isArray(data)) return [];

  return data.map((raw) => {
    const order = raw as Record<string, unknown>;
    const itemsCount = Array.isArray(order.items)
      ? order.items.reduce((acc: number, item: Record<string, unknown>) => {
          const quantity = Number((item as { quantity?: unknown })?.quantity ?? 0);
          return acc + (Number.isFinite(quantity) ? quantity : 0);
        }, 0)
      : undefined;

    const fecha =
      typeof order.fecha === 'string'
        ? order.fecha
        : typeof order.createdAt === 'string'
          ? order.createdAt
          : typeof order.updatedAt === 'string'
            ? order.updatedAt
            : undefined;

    const idSource =
      order._id ??
      order.id ??
      order.numero ??
      order.codigo ??
      (typeof order.cliente === 'string'
        ? `orden-${order.cliente}-${Math.random().toString(36).slice(2, 7)}`
        : `orden-${Math.random().toString(36).slice(2, 9)}`);

    return {
      id: String(idSource),
      cliente:
        typeof order.cliente === 'string'
          ? order.cliente
          : typeof order.customerName === 'string'
            ? order.customerName
            : 'Cliente',
      ciudad:
        typeof order.ciudad === 'string'
          ? order.ciudad
          : typeof order.city === 'string'
            ? order.city
            : undefined,
      fecha,
      estado: (order.estado ?? 'pendiente') as OrderStatus,
      total: Number(order.total) || 0,
      articulos:
        typeof order.articulos === 'number' ? order.articulos : itemsCount ?? undefined,
      canal:
        typeof order.canal === 'string'
          ? order.canal
          : typeof order.channel === 'string'
            ? order.channel
            : 'Web',
    };
  });
};

export default function ControlPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('todas');
  const [notifFilter, setNotifFilter] = useState<NotificationFilter>('todas');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    let active = true;

    const request = async <T,>(path: string): Promise<T[] | null> => {
      try {
        const response = await fetch(`${API_BASE}${path}`);
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return Array.isArray(data) ? data : null;
      } catch {
        return null;
      }
    };

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [apiOrders, apiUsers, apiNotifications] = await Promise.all([
          request<Record<string, unknown>>('/ordenes'),
          request<User>('/usuarios'),
          request<Notification>('/notificaciones'),
        ]);

        if (!active) {
          return;
        }

        const usedFallback =
          !apiOrders?.length || !apiUsers?.length || !apiNotifications?.length;

        setOrders(apiOrders?.length ? normalizeOrders(apiOrders) : FALLBACK_ORDERS);
        setUsers(apiUsers?.length ? apiUsers : FALLBACK_USERS);
        setNotifications(apiNotifications?.length ? apiNotifications : FALLBACK_NOTIFICATIONS);

        setLastUpdate(new Date());
        setError(usedFallback ? 'Mostrando datos de ejemplo porque la API no devolvió información.' : null);
      } catch {
        if (!active) {
          return;
        }
        setOrders(FALLBACK_ORDERS);
        setUsers(FALLBACK_USERS);
        setNotifications(FALLBACK_NOTIFICATIONS);
        setError('No pudimos conectarnos con el servidor, usando datos de referencia.');
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [refreshIndex]);

  const filteredOrders = useMemo(() => {
    const sorted = [...orders].sort(
      (a, b) => getOrderDateValue(b) - getOrderDateValue(a),
    );
    if (orderFilter === 'todas') {
      return sorted;
    }
    return sorted.filter(order => order.estado === orderFilter);
  }, [orders, orderFilter]);

  const filteredNotifications = useMemo(() => {
    if (notifFilter === 'todas') {
      return notifications;
    }
    return notifications.filter(item => item.tipo === notifFilter);
  }, [notifications, notifFilter]);

  const metrics = useMemo(() => {
    const totalIngresos = orders.reduce((acc, order) => acc + order.total, 0);
    const abiertas = orders.filter(
      order => order.estado !== 'entregada' && order.estado !== 'cancelada',
    ).length;
    const clientes = new Set(orders.map(order => order.cliente)).size;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const nuevosUsuarios = users.filter(user => {
      const date = new Date(user.registrado);
      return !Number.isNaN(date.valueOf()) && date >= thirtyDaysAgo;
    }).length;

    return { totalIngresos, abiertas, clientes, nuevosUsuarios };
  }, [orders, users]);

  const topUsers = useMemo(() => {
    if (!users.length) {
      return [];
    }
    return [...users].sort((a, b) => b.pedidos - a.pedidos).slice(0, 4);
  }, [users]);

  const unreadNotifications = notifications.filter(item => !item.visto).length;

  const handleRefresh = () => setRefreshIndex(index => index + 1);

  const handleNotificationSeen = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, visto: true } : notification,
      ),
    );
  };

  return (
    <main className="panel-page">
      <header className="panel-header">
        <div>
          <p className="panel-eyebrow">Panel interno Mascotario</p>
          <h1>Panel de control</h1>
          <p className="panel-subtitle">
            Consulta órdenes recientes, usuarios registrados y alertas operativas.
          </p>
        </div>
        <div className="panel-header-actions">
          {lastUpdate && (
            <span className="panel-last-update">
              Actualizado: {safeFormatDateTime(lastUpdate)}
            </span>
          )}
          <button className="panel-btn" onClick={handleRefresh} disabled={loading}>
            {loading ? 'Actualizando…' : 'Actualizar datos'}
          </button>
        </div>
      </header>

      {error && <div className="panel-alert">{error}</div>}

      <section className="panel-metrics">
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            💸
          </span>
          <div>
            <p className="metric-label">Ingresos estimados</p>
            <p className="metric-value">{formatCurrency(metrics.totalIngresos)}</p>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            🧾
          </span>
          <div>
            <p className="metric-label">Órdenes activas</p>
            <p className="metric-value">{metrics.abiertas}</p>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            👥
          </span>
          <div>
            <p className="metric-label">Clientes con compras</p>
            <p className="metric-value">{metrics.clientes}</p>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon" aria-hidden="true">
            ✉️
          </span>
          <div>
            <p className="metric-label">Notificaciones pendientes</p>
            <p className="metric-value">{unreadNotifications}</p>
          </div>
        </article>
      </section>

      <div className="panel-content-grid">
        <section className="panel-card orders-card">
          <div className="panel-card-header">
            <div>
              <h2>Órdenes de compra</h2>
              <p>Historial reciente y estado por canal.</p>
            </div>
            <div className="chip-group" role="tablist" aria-label="Filtro de órdenes">
              {ORDER_FILTERS.map(filter => (
                <button
                  key={filter}
                  className={`chip ${orderFilter === filter ? 'active' : ''}`}
                  onClick={() => setOrderFilter(filter)}
                  type="button"
                >
                  {filter === 'todas' ? 'Todas' : STATUS_INFO[filter].label}
                </button>
              ))}
            </div>
          </div>
          <div className="panel-table-wrapper">
            <table className="panel-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th>Canal</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.slice(0, 8).map(order => (
                  <tr key={order.id}>
                    <td>
                      <p className="table-strong">{order.cliente}</p>
                      <span className="table-muted">{order.ciudad}</span>
                    </td>
                    <td>{safeFormatDate(order.fecha ?? '')}</td>
                    <td>
                      <span className={`status-pill ${STATUS_INFO[order.estado].tone}`}>
                        {STATUS_INFO[order.estado].label}
                      </span>
                    </td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <span className="table-strong">{order.canal ?? 'Web'}</span>
                      <span className="table-muted">
                        {order.articulos ?? '—'} ítems
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredOrders.length && (
              <p className="panel-empty">No hay órdenes para el filtro seleccionado.</p>
            )}
          </div>
        </section>

        <section className="panel-card users-card">
          <div className="panel-card-header">
            <div>
              <h2>Usuarios registrados</h2>
              <p>Top clientes según frecuencia de compra.</p>
            </div>
            <span className="panel-chip">{users.length} usuarios</span>
          </div>
          <ul className="user-list">
            {topUsers.map(user => (
              <li key={user.id} className="user-row">
                <div className="user-avatar" aria-hidden="true">
                  {user.nombre.charAt(0)}
                </div>
                <div className="user-info">
                  <p className="user-name">{user.nombre}</p>
                  <span className="user-meta">
                    {user.ciudad} · Registrado {safeFormatDate(user.registrado)}
                  </span>
                </div>
                <div className="user-stats">
                  <span className="user-orders">{user.pedidos} pedidos</span>
                  <span className="user-ticket">{formatCurrency(user.ticketPromedio)}</span>
                </div>
              </li>
            ))}
            {!topUsers.length && <p className="panel-empty">Aún no hay usuarios registrados.</p>}
          </ul>
        </section>
      </div>

      <section className="panel-card notifications-card">
        <div className="panel-card-header">
          <div>
            <h2>Notificaciones</h2>
            <p>Alertas de pagos, stock y logística.</p>
          </div>
          <div className="chip-group" role="tablist" aria-label="Filtro de notificaciones">
            {NOTIFICATION_FILTERS.map(filter => (
              <button
                key={filter}
                className={`chip ${notifFilter === filter ? 'active' : ''}`}
                onClick={() => setNotifFilter(filter)}
                type="button"
              >
                {filter === 'todas' ? 'Todas' : NOTIFICATION_INFO[filter].label}
              </button>
            ))}
          </div>
        </div>
        <ul className="notification-list">
          {filteredNotifications.map(notification => (
            <li
              key={notification.id}
              className={`notification-row ${notification.visto ? 'seen' : 'pending'}`}
            >
              <div className="notification-icon" aria-hidden="true">
                {NOTIFICATION_INFO[notification.tipo].icon}
              </div>
              <div className="notification-body">
                <div className="notification-head">
                  <p className="notification-title">{notification.titulo}</p>
                  <span
                    className={`status-pill small ${
                      notification.visto ? 'success' : 'warning'
                    }`}
                  >
                    {notification.visto ? 'Leída' : 'Pendiente'}
                  </span>
                </div>
                <p className="notification-desc">{notification.descripcion}</p>
                <div className="notification-meta">
                  <span>{safeFormatDateTime(notification.fecha)}</span>
                  <span className={`notification-type ${notification.tipo}`}>
                    {NOTIFICATION_INFO[notification.tipo].label}
                  </span>
                </div>
              </div>
              {!notification.visto && (
                <button
                  className="link-btn"
                  onClick={() => handleNotificationSeen(notification.id)}
                  type="button"
                >
                  Marcar
                </button>
              )}
            </li>
          ))}
        </ul>
        {!filteredNotifications.length && (
          <p className="panel-empty">No hay alertas con el filtro aplicado.</p>
        )}
      </section>

      {loading && (
        <div className="panel-loading" aria-live="polite">
          <span className="panel-spinner" />
          <p>Sincronizando con el servidor…</p>
        </div>
      )}
    </main>
  );
}

