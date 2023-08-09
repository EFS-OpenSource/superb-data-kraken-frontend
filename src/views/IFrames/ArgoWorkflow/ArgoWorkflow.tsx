import { ReactElement } from 'react';
import Iframe from 'react-iframe';

const ArgoWorkflow = (): ReactElement => {
  const url = process.env.VITE_WORKFLOW_URL as string;

  return (
    <Iframe
      url={url}
      width="100%"
      height="100%"
      id="iframe-dash"
      className="Dashboards-iframe-class"
      display="inline"
      position="relative"
      frameBorder={0}
    />
  );
};

export default ArgoWorkflow;
