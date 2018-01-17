import './ActionBar.less';
import { changeSize, changeSort } from './actions/paging'
import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import React from 'react';
import { showExportDialog } from './actions/dataExport'

const sizes = [ 10, 25, 50, 100 ]

/* eslint-disable camelcase */

const sorts = {
  created_date_desc: 'Sort by newest to oldest',
  created_date_asc: 'Sort by oldest to newest',
  relevance_desc: 'Sort by relevance',
  relevance_asc: 'Sort by relevance (asc)'
}

/* eslint-enable camelcase */

export class ActionBar extends React.Component {
  render() {
    return (
        <summary className="action-bar">
          <div>
            <h4>
              Showing&nbsp;
              <FormattedNumber value={this.props.total} />
              &nbsp;matching results
            </h4>
          </div>
        </summary>
    );
  }
}

export const mapStateToProps = state => ( {
  size: state.query.size,
  sort: state.query.sort,
  hits: state.results.total,
  total: state.results.doc_count
} )

export const mapDispatchToProps = dispatch => ( {
  onSize: ev => {
    const iSize = parseInt( ev.target.value, 10 )
    dispatch( changeSize( iSize ) )
  },
  onSort: ev => {
    dispatch( changeSort( ev.target.value ) )
  },
  onExportResults: () => {
    dispatch( showExportDialog() )
  }
} )

export default connect( mapStateToProps, mapDispatchToProps )( ActionBar )