import React from 'react';
import { useParams } from 'react-router-dom';

// Example data structure
const data = [
    {
        "username": "Pooja",
        "projectName": "TSS",
        "modules": [
            {
                "name": "Application Whitelisting",
                "submodules": [
                    { "name": "SetMode" },
                    { "name": "View Mode" }
                ]
            },
            {
                "name": "Application Blacklisting",
                "submodules": [
                    { "name": "SetModeBlacklist" }
                ]
            }
        ]
    },
    {
        "username": "Pariii",
        "projectName": "TSS",
        "modules": [
            {
                "name": "Application Whitelisting",
                "submodules": [
                    { "name": "SetMode" },
                    { "name": "View Mode" }
                ]
            },
            {
                "name": "Application Blacklisting",
                "submodules": [
                    { "name": "SetModeBlacklist" }
                ]
            }
        ]
    },
    {
        "username": "Pankaj",
        "projectName": "EDR",
        "modules": [
            {
                "name": "Dashboard",
                "submodules": [
                    { "name": "EDRDashboard" }
                ]
            }
        ]
    },
    {
        "username": "Pari",
        "projectName": "EDR",
        "modules": [
            {
                "name": "Dashboard",
                "submodules": [
                    { "name": "EDRDashboard" }
                ]
            }
        ]
    }
];

const ProjectPage = () => {
  const { projectName } = useParams(); // Assuming you are using React Router for routing

  // Find project data based on projectName
  const project = data.find(project => project.projectName === projectName);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div>
      <h1>{project.projectName}</h1>
      {project.modules.map((module, index) => (
        <div key={index}>
          <h2>{module.name}</h2>
          {module.submodules.map((submodule, subIndex) => (
            <div key={subIndex}>
              <p>{submodule.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectPage;
