import React, { Component } from 'react';

class Subject extends Component {
    render() {
      return (
        <header>
            <h1><a href="/" onClick={function (e) {
                e.preventDefault(); // 클릭 시 새로고침 막기 위함
                this.props.onChangePage();
            }.bind(this)}>{this.props.title}</a></h1>
            {/* arrow function으로 하면 bind(this)없이 this 사용 가능 */}
            {this.props.sub}
        </header>
      );
    }
}

export default Subject;