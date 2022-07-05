import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import UpdateContent from './components/UpdateContent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'read',
      selected_content_id: 2,
      subject: {title: 'WEB', sub: 'world wide web!'},
      welcome: {title: 'Welcome', desc: 'Hello, React!!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is for information'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    };
  }
  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }
  getContent() {
    let _title, _desc, _article, _content = null;

    if (this.state.mode === 'welcome') { // welcome 모드일 때
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
      // 바뀔 수 있는 _article을 모드에 따라 컴포넌트 설정

    } else if (this.state.mode === 'read') { // read 모드일 때
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === 'create') { // create 모드일 때
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id++;
        // push보단 concat 사용하기
        let _contents = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc: _desc}
        );
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        });
      }.bind(this)}></CreateContent>

    } else if (this.state.mode === 'update') { // update 모드일 때
      _content = this.getReadContent();
      _article = <UpdateContent data={_content}
        onSubmit={function (_id, _title, _desc) {
          let _contents = Array.from(this.state.contents); // 수정하기 위해 원본 복사
          let i = 0;
          while(i < _contents.length) { // contents 안에있는 id 중 수정하고자 하는 id 찾기
            if (_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc}
              break;
            }
            i++;
          }
          this.setState({
            contents: _contents,
            mode: 'read'
          });
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            // this.state.mode = 'welcome'; (x)
            this.setState({
              mode: 'welcome'
            });
          }.bind(this)}>
        </Subject>

        <TOC onChangePage={function (id) {
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });
        }.bind(this)}
        data={this.state.contents}></TOC>

        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm("really?")) {
              let _contents = Array.from(this.state.contents);
              let i =0;
              while (i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert("delete!");
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>

        {this.getContent()}
        {/* <Content title={_title} desc={_desc}></Content> */}
      </div>
    );
  }
}

export default App;
