'use client'

import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Calendar from './Calendar';
import EventPopup from './eventPopup';
import UserEvents from './UserEvents';
import styles from '../styles.module.css'

export type calendarEventProps = {
  id: string,
  date: string,
  description: string,
  authorEmail: string
}

export default function App({ calendarEvents }: calendarEventProps) {

  const session = useSession();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);
  const [lsItems, setLsItems] = useState<calendarEventProps[]>(calendarEvents)


  if (session.status === 'authenticated') {
    return (
      <div className={styles.App}>
        <EventPopup 
          popupIsVisible={popupIsVisible} 
          setPopupIsVisible={setPopupIsVisible}
          selectedDate={selectedDate}
          setLsItems={setLsItems}
        />

        <div className={styles.left}>
          <h1>Your saved events:</h1>
          <UserEvents 
            setLsItems={setLsItems}
            lsItems={lsItems}
          />
        </div>

        <div className={styles.right}>
          <h2>Select a day to add events</h2>
          <Calendar 
            setPopupIsVisible={setPopupIsVisible}
            setSelectedDate={setSelectedDate}
            lsItems={lsItems}
          />
        </div>
      </div>
    )} else {
      return <div></div>
    }

}
