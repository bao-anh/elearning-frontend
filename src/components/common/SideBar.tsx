import React, { FunctionComponent } from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const SideBar: FunctionComponent<{
  renderStyleListItem: any;
  handleChangeLink: any;
  iconArray: any;
}> = ({ renderStyleListItem, handleChangeLink, iconArray }) => {
  return iconArray.map((children: any, index: any) => (
    <ListItem
      button
      key={children.text}
      style={renderStyleListItem(index)}
      onClick={() => handleChangeLink(index)}
    >
      <ListItemIcon style={{ minWidth: '40px' }}>{children.icon}</ListItemIcon>
      <ListItemText primary={children.text} />
    </ListItem>
  ));
};

export default SideBar;
