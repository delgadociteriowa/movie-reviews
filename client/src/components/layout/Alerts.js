import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

export const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
      alertCOntext.alerts.length > 0 && alertContext.alerts.map(alert => {
        <div key={alert.id} className={`alert alet-${alert.type}`}>
          <div className="fas fa-info-circle"></div> {alert.msg}
        </div>
      }) 
  )
}

//11:47 62

export default Alerts 