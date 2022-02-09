import React, {lazy} from 'react'
import WidgetsImage from "../widgets/WidgetsImage";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {
  return (
    <>
      {/*<WidgetsBrand withCharts/>*/}
      <WidgetsImage/>
    </>
  )
};

export default Dashboard
