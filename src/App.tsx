// src/App.tsx
import './App.css';
import { AppRouter } from './components/app/AppRouter';
import { InicioSection } from './components/app/InicioSection';
import { TagsSection } from './components/app/TagsSection';
import { TasksSection } from './components/app/TasksSection';
import { HomeIcon, TasksIcon, TagsIcon } from './components/ui/icons';

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