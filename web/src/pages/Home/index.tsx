import logo from "../../assets/logo.svg";
import { OctagonAlert, Bell, ChevronRight, SendHorizonal, Power } from "lucide-react";
import "./styles.css";
import { MetricsCard } from "../../components/MetricsCard";
import { ButtonWithIcon } from "../../components/ButtonWithIcon";
import { FormEvent, useEffect, useState } from "react";
import { fetchData, postData } from "../../services/api";
import { DialogLayout } from "../../components/Dialog";
import { SelectWithIcon } from "../../components/SelectWithIcon";
import { TextAreaWithIcon } from "../../components/TextareaWithIcon";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

interface NotificationProps {
  id: string;
  subscriberId: string;
  message: string;
  createdAt: Date;
  subscriber: {
    id: string;
    phone: string;
    deviceId: string;
    verified: boolean;
  };
}

interface AlertsProps {
  id: string;
  title: string;
  message: string;
  districtId: string;
  provinceId: string;
  createdAt: Date;
  province: {
    id: string;
    designation: string;
  };
  district: {
    id: string;
    designation: string;
  };
}

interface StatsPropsSchema {
  total: number;
  last: number;
}

interface StatsProps {
  subscribers: StatsPropsSchema;
  alerts: StatsPropsSchema;
  notifications: StatsPropsSchema;
}

interface LocationProps {
  id: string;
  designation: string;
}

export function Home() {
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [alerts, setAlerts] = useState<AlertsProps[]>([]);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districs, setDistricts] = useState<LocationProps[]>([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    Promise.all([
      fetchData<StatsProps>("/stats"),
      fetchData<AlertsProps[]>("/alerts"),
      fetchData<NotificationProps[]>("/notifications"),
      fetchData<LocationProps[]>("/provinces"),
    ])
      .then(([stats, alerts, notifications, provinces]) => {
        setStats(stats);
        setAlerts(alerts);
        setNotifications(notifications);
        setProvinces(provinces);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchData<LocationProps[]>(`/districts/${selectedProvinceId}`).then(
      (response) => {
        setDistricts(response);
      }
    );
  }, [selectedProvinceId]);

  function handleSubmitAlert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postData("/alerts", {
      message: message,
      provinceId: selectedProvinceId,
      districtId: selectedDistrictId,
      title: 'Alerta'
    })
      .then((_response) => {
        loadAlerts();
        setAlertDialogOpen(false);
      })
      .catch((error) => {
        console.log(error);
        alert("falha no envio do alerta");
      });
  }

  function loadAlerts() {
    fetchData<AlertsProps[]>("/alerts").then(alerts => {
        setAlerts(alerts)
    });
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div id="home-page">
      <header>
        <img src={logo} alt="Logo Beprepared" />
        <div className="actions">
          <ButtonWithIcon text="Alertar" Icon={OctagonAlert} onClick={(_e) => setAlertDialogOpen(true)}/>
          <button className="logout" onClick={handleLogout}>
            <Power />
          </button>
        </div>
      </header>

      <div className="metrics">
        <MetricsCard
          title="Cadastros"
          total={stats?.subscribers.total || 0}
          last={stats?.subscribers.last || 0}
        />
        <MetricsCard
          title="Alertas"
          total={stats?.alerts.total || 0}
          last={stats?.alerts.last || 0}
        />
        <MetricsCard
          title="Notificações"
          total={stats?.notifications.total || 0}
          last={stats?.notifications.last || 0}
        />
      </div>

      <div className="alerts-list">
        <main>
          <header>
            <h1>
              <OctagonAlert size={24} color="#000" />
              <span>Lista de alertas</span>
            </h1>
            <ButtonWithIcon
              text="Alertar"
              Icon={OctagonAlert}
              size="small"
              onClick={(_e) => setAlertDialogOpen(true)}
            />
          </header>
          <table>
            <thead>
              <tr>
                <th>Mensagem</th>
                <th>Alcance</th>
                <th>Localização</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.message}</td>
                  <td>23233</td>
                  <td>
                    {alert.province.designation} - {alert.district.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <aside>
          <header>
            <Bell size={24} color="#000"></Bell>
            <h2>Notificações</h2>
            <span>{notifications.length}</span>
          </header>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <section>
                  <div className="circle full"></div>
                  <span>{notification.subscriber.phone}</span> |{" "}
                  <span className="message">{notification.message}</span>
                </section>
                <ChevronRight size={24} color="#000"></ChevronRight>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <DialogLayout
        open={alertDialogOpen}
        onOpenChange={setAlertDialogOpen}
        title="Novo Alerta"
        IconTitle={OctagonAlert}
      >
        <form onSubmit={handleSubmitAlert}>
          <fieldset>
            <SelectWithIcon
              required
              name="province"
              label="Província"
              options={provinces}
              onChange={(e) => setSelectedProvinceId(e.target.value)}
            />
            <SelectWithIcon
              required
              name="district"
              label="Distríto"
              options={districs}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
            />
          </fieldset>
          <small>Alcance: 1243 pessoas</small>

          <TextAreaWithIcon
            required
            label="Escreva o seu alerta"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="form-submit-button">
            <ButtonWithIcon type="submit" text="Alertar" Icon={SendHorizonal} />
          </div>
        </form>
      </DialogLayout>
    </div>
  );
}
