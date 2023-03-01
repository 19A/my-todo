import react, { Component } from "react";
import { Tag } from "antd";

// tabs, activeKey, onChange
export default class Tabs extends Component {
  render() {
    const { tabs = [], activeKey,className } = this.props;
    return (
      <div className={`tab-container ${className}`}>
        <div className='tab-tags'>
          {tabs.map((i) => (
            <Tag
              className={i.activeKey === i.key ? "active tag-tab" : "tab-tag"}
              onClick={() => {
                debugger;
                this.props.onChange(i.key);
              }}
            >
              {i.label}
            </Tag>
          ))}
        </div>
        {tabs.find((i) => activeKey === i.key).children}
      </div>
    );
  }
}
