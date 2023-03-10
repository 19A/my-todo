import react, { Component } from "react";
import { Tag } from "antd";

import "./index.less";
// tabs, activeKey, onChange
export default class Tabs extends Component {
  render() {
    const { tabs = [], activeKey, className } = this.props;
    return (
      <div className={`tab-container ${className}`}>
        <div className='tab-tags'>
          {tabs.map((i) => (
            <div
              key={i.key}
              className={activeKey === i.key ? "active tab-tag" : "tab-tag"}
              onClick={() => {
                this.props.onChange(i.key);
              }}
            >
              {i.icon}
              <span className='text'>{i.label}</span>
            </div>
          ))}
        </div>
        {tabs.find((i) => activeKey === i.key).children}
      </div>
    );
  }
}
