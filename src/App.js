import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Logout from './UESM_Dashboard/UESM_Header/UESM_Logout';
import UESM__Dashboard from './UESM_Dashboard/UESM__Dashboard';
import EDR_Dashboard from './EDR/EDR_Dashboard';
import ViewWhitelist from './EDR/Sidebar/EndPointControls/ViewWhitelisting/ViewWhitelist';
import FileMonitor from './EDR/Sidebar/Dashboard/FileMonitoring/FileMonitor';
import Website_Blacklist from './EDR/Sidebar/Web_Filtering/Website_Blacklist';
import PreventApplication from './EDR/Sidebar/EndPointControls/PreventApplication/PreventApplication';
import ApplyFileMonitoringPolicy from './EDR/Sidebar/EndPointControls/ApplyFileMonitoringPolicy/ApplyFileMonitoringPolicy';
import ObservedMalwareAttacks from './EDR/Sidebar/Dashboard/ObservedMalwareAttack/ObservedMalwareAttacks';
import ViewFileMonitoringPolicies from './EDR/Sidebar/Dashboard/ViewFileMonitoringPolicies/ViewFileMonitoringPolicies';
import ViewDevice from './EDR/Sidebar/WebControls/ViewDevice';
import QuarantinedApplicationList from './EDR/Sidebar/WebControls/QuarantinedApplicationList';
import ReportedApplication from './EDR/Sidebar/WebControls/ReportedApplication';
import DeviceControlDashboard from './EDR/Sidebar/Dashboard/DeviceControlDashboard/DeviceControlDashboard';
import Layout from './ConfigFile/Layout';
import AllowApplication from './EDR/Sidebar/EndPointControls/AllowApplication/AllowApplication';

import PrivateRoute from './ConfigFile/PrivateRoute';
import ErrorPage from './ErrorPage';
import CreateFileMonitoringPolicy from './EDR/Sidebar/EndPointControls/CreateFileMonitoringPolicy/CreateFileMonitoringPolicy';
 import Module from './Module';
import ProjectPage from './ProjectPage';
import UESM_Login from './UESM_Dashboard/UESM_Login';
import UESM_Sidebar from './UESM_Dashboard/UESM_Sidebar/UESM_Sidebar';
import Admin from './Admin/Admin';
import TSS_DASH from './TSS/TSS_DASH';
import SetMode from './TSS/Application_Whitelisting/SetMode';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<UESM_Login />} />
        <Route path="*" element={<ErrorPage />} />



        {/* <Route path="/" element={<Module />} /> */}
        {/* ProjectPage route with projectId parameter */}
        {/* <Route path="/project/:projectId" element={<ProjectPage />} /> */}
        {/* <Route path="/:projectName" element={<ProjectPage />} /> */}

        {/* UESM Dashboard and logout routes */}

        {/* // AFTER NORMAL USER LOGIN*/}
        <Route path="/UESM__Dashboard" element={<PrivateRoute><UESM__Dashboard/></PrivateRoute>} />
            {/* // AFTER ADMIN  LOGIN*/}
        <Route path="/Admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
        <Route path="/UESM_Sidebar" element={<PrivateRoute><UESM_Sidebar /></PrivateRoute>} />

        {/* EDR routes */}
        <Route path="/ObservedMalwareAttacks" element={<PrivateRoute><Layout><ObservedMalwareAttacks /></Layout></PrivateRoute>} />
        <Route path="/DeviceControlDashboard" element={<PrivateRoute><Layout><DeviceControlDashboard /></Layout></PrivateRoute>} />
        <Route path="/EDR_Dashboard" element={<PrivateRoute><EDR_Dashboard /></PrivateRoute>} />
        <Route path="/AllowApplication" element={<PrivateRoute><Layout><AllowApplication /></Layout></PrivateRoute>} />
        <Route path="/ViewWhitelist" element={<PrivateRoute><Layout><ViewWhitelist /></Layout></PrivateRoute>} />
        <Route path="/FileMonitor" element={<PrivateRoute><Layout><FileMonitor /></Layout></PrivateRoute>} />
        <Route path="/Website_Blacklist" element={<PrivateRoute><Layout><Website_Blacklist /></Layout></PrivateRoute>} />
        <Route path="/PreventApplication" element={<PrivateRoute><Layout><PreventApplication /></Layout></PrivateRoute>} />
        <Route path="/ApplyFileMonitoringPolicy" element={<PrivateRoute><Layout><ApplyFileMonitoringPolicy /></Layout></PrivateRoute>} />
        <Route path="/ViewFileMonitoringPolicies" element={<PrivateRoute><Layout><ViewFileMonitoringPolicies /></Layout></PrivateRoute>} />
        <Route path="/QuarantinedApplicationList" element={<PrivateRoute><Layout><QuarantinedApplicationList /></Layout></PrivateRoute>} />
        <Route path="/ViewDevice" element={<PrivateRoute><Layout><ViewDevice /></Layout></PrivateRoute>} />
        <Route path="/ReportedApplication" element={<PrivateRoute><Layout><ReportedApplication /></Layout></PrivateRoute>} />
        <Route path="/CreateFileMonitoringPolicy" element={<PrivateRoute><Layout><CreateFileMonitoringPolicy /></Layout></PrivateRoute>} />
        {/* EDR routes ends*/}
        <Route path="/TSS_Dashboard" element={<PrivateRoute><TSS_DASH /></PrivateRoute>} />
        <Route path="/SetMode" element={<PrivateRoute><Layout><SetMode /></Layout></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
