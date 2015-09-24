import _ from 'lodash';
import path from 'path';
import React from 'react';
import { List, ListItem, Icon } from 'amazeui-react';
import Markdown from './markdown';
import index from '../../../pages';

const TYPE_FILE = 0;
const TYPE_DIRECTORY = 1;
const TYPE_NOT_FOUND = -1;

function getLocation() {
  return location.hash.substring(1).split('/').filter((s) => s);
}

function getType(location) {
  let ret = _.get(index, location);
  if (ret === true)
    return TYPE_FILE;
  else if (ret)
    return TYPE_DIRECTORY;
  else
    return TYPE_NOT_FOUND;
}

function getCurrentType() {
  return getType(getLocation());
}

class ShowView extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  renderPage() {
    return (
      <Markdown src={location.hash.substring(1)} />
    );
  }
  renderItem(item, key, isDirectory) {
    return (
      <ListItem key={key}
                href={path.join(location.hash, item)}>
        <Icon icon={isDirectory ? 'folder-open-o' : 'file-o'} fw />
        { ' ' + item }
      </ListItem>
    );
  }
  renderDirectory() {
    let loc = getLocation();
    let info = _.get(index, loc);
    let items = Object.keys(info);
    if (loc.length > 1)
      items.push('..');
    items = items.sort((a, b) => {
      if (info[a] !== true && info[b] === true)
        return -1;
      if (info[a] === true && info[b] !== true)
        return 1;
      return a < b ? -1 : 1;
    })
    .map((x, i) => {
      return this.renderItem(x, i, info[x] !== true);
    });
    return (
      <List>
        { items }
      </List>
    );
  }
  renderNotFound() {
    return (
      <h1>Not found</h1>
    );
  }
  render() {
    let type = getCurrentType();
    if (type === TYPE_FILE)
      return this.renderPage();
    else if (type === TYPE_DIRECTORY)
      return this.renderDirectory();
    return this.renderNotFound();
  }
}

export default ShowView;
