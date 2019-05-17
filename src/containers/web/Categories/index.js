import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Badge, Tag } from 'antd'
import './index.less'

@connect(state => ({
  categoryList: state.article.categoryList,
  colorList: state.common.colorList
}))

class Categories extends Component {
  render() {
    const { categoryList, colorList } = this.props
    return (
      <div className="content-inner-wrapper categories">
        <h2 className="title">小柠檬味·分类</h2>
        <p className="category-all-title">{`统共有${categoryList.length} 个类别`}</p>

        <div className="categories-list">
          {categoryList.map((item, i) => (
            <Badge count={item.count} key={item.name}>
              <Tag color={colorList[i]}>
                <Link to={`/categories/${item.name}`}>{item.name}</Link>
              </Tag>
            </Badge>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;

