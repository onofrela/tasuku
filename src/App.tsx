// src/App.tsx
import './App.css';
import { AppRouter } from './components/app/AppRouter';
import { InicioSection } from './components/app/InicioSection';
import { TagsSection } from './components/app/TagsSection';
import { TasksSection } from './components/app/TasksSection';

const routes = [
  { id: 'inicio', label: 'Inicio', icon: '🏠', component: <InicioSection /> },
  { id: 'tareas', label: 'Tareas', icon: '📝', component: <TasksSection /> },
  { id: 'tags', label: 'Tags', icon: '🏷️', component: <TagsSection /> },
];

function App() {
  return (
    <AppRouter routes={routes} />
  );
}

export default App;