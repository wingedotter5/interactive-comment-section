import * as React from "react";

interface IViewportContext {
  isMobile: boolean;
}

const viewportContext = React.createContext<IViewportContext | null>(null);

const ViewportProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    window.matchMedia("(max-width: 768px").matches
  );

  const handleWindowResize = () => {
    setIsMobile(window.matchMedia("(max-width: 768px").matches);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </viewportContext.Provider>
  );
};
export default ViewportProvider;

export const useViewport = () => {
  const { isMobile } = React.useContext(viewportContext) as IViewportContext;
  return { isMobile };
};
