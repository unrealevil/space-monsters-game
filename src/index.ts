import { createApplication } from './app';
import { loadResources } from './resources';
import { createJetStage } from './stage';

const app = createApplication(document.body);

loadResources(app.loader, () => {
  const loading = document.querySelector<HTMLElement>('#loading');
  if (loading) {
    loading.style.display = 'none';
  }
  createJetStage(app);
});
