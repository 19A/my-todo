import react, { Component } from "react";
import { Tag } from "antd";
export default class Tabs extends Component {
  render() {
    const { tabs, activeKey } = this.props;
    return (
      <div className='tab-container'>
        {this.props.tabs.find((i) => activeKey === i.key).children}
        <div className='tab-tags'>
          {tabs.map((i) => (
            <Tag
              className={i.activeKey === i.key ? "active tag-tab" : "tab-tag"}
              onClick={() => {
                this.props.onChange(i.key);
              }}
            >
              {i.label}
            </Tag>
          ))}
        </div>
      </div>
    );
  }
}
