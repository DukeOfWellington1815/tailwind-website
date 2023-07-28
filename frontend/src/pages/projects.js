import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../middleware/session';
import ProjectAbstract from '../components/ProjectAbstract/ProjectAbstract';

export default function ProjectsPage() {

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <ProjectAbstract />
    </div>
  );
}
