// Higher-order component
export const SectionWrapper = (Component, idName) => 
  function HOC() {
    return (
      <section id={idName} className="relative z-0">
        <Component />
      </section>
    );
  };

export const motion = {
  div: (props) => <div {...props}>{props.children}</div>,
  p: (props) => <p {...props}>{props.children}</p>,
  span: (props) => <span {...props}>{props.children}</span>,
};
