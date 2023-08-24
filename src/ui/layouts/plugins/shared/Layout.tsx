import React from 'react';

export const PluginsLayout: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex justify-between !px-4 border-b bg-theme-surface-primary border-theme-border-moderate items-center !py-5">
        <div className="flex flex-col hidden md:block">
          <h1 className="text-display-xs font-semibold">{title}</h1>

          <p>
            The ZenML Hub is a{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.zenml.io/zenml-hub-launch/"
            >
              plugin system
            </a>{' '}
            that allows users to contribute and consume stack component flavors,
            pipelines, steps, materializers, and other pieces of code seamlessly
            in their ML pipelines. Below are a list of community contributed
            plugins. If you would like to create your own plugin, click{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.zenml.io/user-guide/advanced-guide/environment-management/use-the-hub"
            >
              here
            </a>
            .
          </p>
        </div>
        <div className="w-full flex justify-end">
          <p className="">
            Check out our easy to read{' '}
            <a
              style={{ color: '#443E99' }}
              href="https://docs.zenml.io/user-guide/advanced-guide/environment-management/use-the-hub"
              target="__blank"
            >
              docs
            </a>
          </p>
        </div>
      </div>
      <div className="!p-4 bg-theme-surface-secondary h-full">{children}</div>
    </div>
  );
};
