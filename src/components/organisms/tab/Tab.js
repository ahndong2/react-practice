import React, { useState } from 'react';

const Tab = ({ defaultSelected, children, callback = () => {} }) => {
  const [selected, setSelected] = useState(defaultSelected);
  const tablist = children.filter(tab => tab.key === 'tab' && tab);
  const tabtool = children.filter(tool => tool.key === 'tool' && tool);

  const handleClick = (e, href, id) => {
    e.preventDefault();
    setSelected(id);
    if (href) window.location = href;
  };

  // useEffect(() => {
  //   callback(selected);
  // }, [selected]);

  return (
    <>
      <div className="tab-comm">
        <ul role="tablist">
          {tablist.length > 0 &&
            tablist.map(tab => {
              const { href, id, label } = tab.props;

              return (
                <li key={id}>
                  <a
                    href={href || '#'}
                    role="tab"
                    aria-selected={id === selected}
                    onClick={e => handleClick(e, href, id)}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
        </ul>
        {tabtool.length > 0 && (
          <div className="tool-tab">
            {tabtool.map((tool, i) => {
              return <React.Fragment key={i}>{tool}</React.Fragment>;
            })}
          </div>
        )}
      </div>
      {tablist.length > 0 &&
        tablist.map(tabpanel => {
          const { id } = tabpanel.props;

          if (id === selected) return <React.Fragment key={id}>{tabpanel}</React.Fragment>;
          return null;
        })}
    </>
  );
};

export default Tab;
