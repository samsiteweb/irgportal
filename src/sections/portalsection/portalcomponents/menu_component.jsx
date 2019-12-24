import React, { Component } from "react";
import { Menu, Input, Dropdown, Icon } from "semantic-ui-react";

class SideMenu extends Component {
  constructor() {
    super();

    this.state = {};
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div style={{ paddingTop: 0 }}>
        <Menu vertical inverted color='violet'>
          {/* <Menu.Item>
            <Input placeholder='Search...' />
          </Menu.Item> */}

          <Menu.Item
            name='home'
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            name='browse'
            active={activeItem === "browse"}
            onClick={this.handleItemClick}
          >
            <Icon name='grid layout' />
            Browse
          </Menu.Item>
          <Menu.Item
            name='messages'
            active={activeItem === "messages"}
            onClick={this.handleItemClick}
          >
            Messages
          </Menu.Item>

          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item icon='edit' text='Edit Profile' />
              <Dropdown.Item icon='globe' text='Choose Language' />
              <Dropdown.Item icon='settings' text='Account Settings' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </div>
    );
  }
}

export default SideMenu;
