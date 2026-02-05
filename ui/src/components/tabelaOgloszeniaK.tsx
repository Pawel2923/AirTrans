import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Announcements } from "../assets/Data";
import styles from "./tabelkaogloszeniaK.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type OgloszeniaTableProps = {
  ogloszenia: Announcements[];
};

const TabelaOgloszeniaK: React.FC<OgloszeniaTableProps> = ({ ogloszenia }) => {
  return (
    <Accordion.Root
      className={styles.container}
     
		type="single"
		defaultValue="item-1"
		collapsible
	>
    
      {ogloszenia.map((ogloszenie) => (
        <Accordion.Item
          key={ogloszenie.id}
          value={String(ogloszenie.id)}
          className={styles.gateCard}
        >
          <Accordion.Header className={styles.header}>
            <Accordion.Trigger className={styles.trigger}>
              <span className={styles.title}>{ogloszenie.title}</span>
              <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className={styles.contentWrapper}>
            <div className={styles.content}>{ogloszenie.content}</div>

            <div className={styles.meta}>
              <span className={styles.valid_until}>
                Ważne do: {ogloszenie.valid_until}
              </span>
              <span className={styles.create_time}>
                Utworzono: {ogloszenie.create_time}
              </span>
              <span className={styles.Employee_id}>
                Utworzył: {ogloszenie.Employee_id}
              </span>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default TabelaOgloszeniaK;
