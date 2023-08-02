import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../middleware/session';
import ProjectAbstract from '../components/ProjectAbstract/ProjectAbstract';

export default function projectsPage() {

  return (
    <div className="container mx-auto rounded-xl shadow max-w-2xl p-8 m-10">
      <ProjectAbstract />
    </div>
  );
}
