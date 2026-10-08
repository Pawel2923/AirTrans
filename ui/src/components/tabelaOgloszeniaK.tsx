import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Announcements } from "../assets/Data";
import styles from "./tabelkaogloszeniaK.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCalendar, faUser, faTriangleExclamation, faInfoCircle, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type AnnouncementCardsProps = {
  announcements: Announcements[];
};

const formatDate = (d?: string) => {
  if (!d) return "-";
  const date = new Date(d);
  return date.toLocaleString("pl-PL");
};

type AnnouncementTypeData = {
  label: string;
  className: string;
  icon: IconDefinition;
};

const ANNOUNCEMENT_TYPES: Record<string, AnnouncementTypeData> = {
  wazne: { label: "Ważne", className: styles.badgeWazne, icon: faTriangleExclamation },
  zmiana: { label: "Zmiana", className: styles.badgeZmiana, icon: faSyncAlt },
  informacja: { label: "Informacja", className: styles.badgeInformacja, icon: faInfoCircle },
};

const DEFAULT_TYPE: AnnouncementTypeData = { label: "-", className: "", icon: faInfoCircle };

const formatType = (type?: string): AnnouncementTypeData => {
  return ANNOUNCEMENT_TYPES[type || ""] || DEFAULT_TYPE;
};

const AnnouncementCards: React.FC<AnnouncementCardsProps> = ({ announcements }) => {
  return (
    <Accordion.Root
      className={styles.container}
      type="single"
      collapsible
    >
     {announcements.map((announcement) => (
        <Accordion.Item key={announcement.id} value={String(announcement.id)} className={styles.gateCard}>

          <Accordion.Header>
            <Accordion.Trigger className={styles.trigger}>

              <div className={styles.headerLeft}>
                <span className={`${styles.badge} ${formatType(announcement.type).className}`}>
                  <FontAwesomeIcon icon={formatType(announcement.type).icon} />
                  {formatType(announcement.type).label}
                </span>
                <span className={styles.title}>{announcement.title}</span>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.validMini}>
                  do {formatDate(announcement.valid_until)}
                </span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
              </div>

            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className={styles.contentWrapper}>

            <div className={styles.content}>
              {announcement.content}
            </div>

            <div className={styles.metaRow}>
              <div>
                <FontAwesomeIcon icon={faCalendar} />
                <span>Utworzono: {formatDate(announcement.create_time)}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faUser} />
                <span>Utworzył: {announcement.Employee_id}</span>
              </div>
            </div>

          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default AnnouncementCards;
