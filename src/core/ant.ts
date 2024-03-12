import { Button, Input, Tag } from "ant-design-vue";
import type { App } from "vue";

const setupAnt = (app: App) => {
  const components = [Input, Tag, Button];
  components.forEach((cmp) => {
    app.use(cmp);
  });
};

export default setupAnt;
