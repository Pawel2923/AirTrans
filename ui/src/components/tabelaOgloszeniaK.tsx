import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Announcements } from "../assets/Data";
import styles from "./tabelkaogloszeniaK.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCalendar, faUser, faTriangleExclamation, faInfoCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

type Props = {
  ogloszenia: Announcements[];
};

const formatDate = (d?: string) => {
  if (!d) return "-";
  const date = new Date(d);
  return date.toLocaleString("pl-PL");
};

const formatType = (type?: string) => {
  switch(type) {
    case "wazne":
      return { label: "Ważne", className: styles.badgeWazne, icon: faTriangleExclamation };
    case "zmiana":
      return { label: "Zmiana", className: styles.badgeZmiana, icon: faSyncAlt };
    case "informacja":
      return { label: "Informacja", className: styles.badgeInformacja, icon: faInfoCircle };
    default:
      return { label: "-", className: "", icon: faInfoCircle };
  }
};

const TabelaOgloszeniaK: React.FC<Props> = ({ ogloszenia }) => {
  return (
    <Accordion.Root
      className={styles.container}
      type="single"
      collapsible
    >
      {ogloszenia.map((o) => (
        <Accordion.Item key={o.id} value={String(o.id)} className={styles.gateCard}>

          <Accordion.Header>
            <Accordion.Trigger className={styles.trigger}>

              <div className={styles.headerLeft}>
                <span className={`${styles.badge} ${formatType(o.type).className}`}>
                  <FontAwesomeIcon icon={formatType(o.type).icon} />
                  {formatType(o.type).label}
                </span>
                <span className={styles.title}>{o.title}</span>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.validMini}>
                  do {formatDate(o.valid_until)}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
              </div>

            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className={styles.contentWrapper}>

            <div className={styles.content}>
              {o.content}
            </div>

            <div className={styles.metaRow}>
              <div>
                <FontAwesomeIcon icon={faCalendar} />
                <span>Utworzono: {formatDate(o.create_time)}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faUser} />
                <span>Utworzył: {o.Employee_id}</span>
              </div>
            </div>

          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default TabelaOgloszeniaK;
