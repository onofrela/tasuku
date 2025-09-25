// src/App.tsx
import './App.css';
import { AppRouter } from '../router/AppRouter';
import { InicioSection } from '../../features/dashboard/components/InicioSection';
import { TagsSection } from '../../features/tags/components/TagsSection';
import { TasksSection } from '../../features/tasks/components/TasksSection';
import { HomeIcon, TasksIcon, TagsIcon } from '../../shared/ui/icons';

const routes = [
  { 
    id: 'inicio', 
    label: 'Inicio', 
    icon: <HomeIcon size="lg" />, 
    component: <InicioSection /> 
  },
  { 
    id: 'tareas', 
    label: 'Tareas', 
    icon: <TasksIcon size="lg" />, 
    component: <TasksSection /> 
  },
  { 
    id: 'tags', 
    label: 'Tags', 
    icon: <TagsIcon size="lg" />, 
    component: <TagsSection /> 
  },
];

function App() {
  return (
    <AppRouter routes={routes} />
  );
}

export default App;