import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  ListView,
  View,
  Text,
} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      rowHasChanged: (r1, r2) => r1 !== r2,
      getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId].meta,
      getRowData: (dataBlob, sectionId, rowId) => dataBlob[sectionId].rows[rowId]
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(data, dataSections, dataRows)
    }
  }

  render() {
    return (
      <ListView
        style={{ paddingTop: 20 }}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListViewRow label={rowData} style={styles.rowContainer} />}
        renderSectionHeader={(sectionData) => <ListViewSection label={sectionData} style={styles.sectionContainer} />}
      />
    );
  }
}

class ListViewRow extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Text>{this.props.label}</Text>
      </View>
    );
  }
}

class ListViewSection extends Component {
  render() {
    console.log('style', this.props.style, StyleSheet.flatten(this.props.style));
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={this.props.style}>
          <Text>{'Left'}</Text>
          <Text>{this.props.label}</Text>
          <Text>{'Right'}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onPress() {
    console.log('press');
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fffff8',
    borderBottomColor: '#757575',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: 'orange',
    borderBottomWidth: 1,
    backgroundColor: '#bdbdbd'
  }
});

const data = {
  section1: {
    meta: 'Fruits',
    rows: ['Apple', 'Banana', 'Cherry']
  },
  section2: {
    meta: 'Animals',
    rows: ['Alligator', 'Bonobo', 'Chinchilla', 'Dingo', 'Emu', 'Feraligatr', 'Giraffe', 'Horse']
  },
  section3: {
    meta: 'Houses',
    rows: ['Doll', 'Toll', 'White']
  }
};

const dataSections = ['section1', 'section2', 'section3'];

const dataRows = [[0, 1, 2], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2]];