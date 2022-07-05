import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log('>>>>TOC render shouldComponentUpdate',
        newProps.data, this.props.data);
        // 바뀐 값과 원래의 값을 알 수 있음
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        let lists = [];
        let data = this.props.data;
        let i = 0;
        while (i < data.length) {
            lists.push(
                <li key={data[i].id}>
                    <a href={"/content/"+data[i].id}
                    data-id={data[i].id}
                    onClick={function (e) {
                        e.preventDefault(); // 클릭 시 새로고침 막기 위함
                        this.props.onChangePage(e.target.dataset.id);
                        // e.target은 a 태그를 가리킴, dataset 통해 data-id의 id값 알아내기
                    }.bind(this)}>{data[i].title}</a>
                </li>);
            i++;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;