import React, { Component } from 'react'

const width = 50
const height = 50

class LifeGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ctx: null,
      matrix: []
    }
  }
  componentWillMount() {
    document.title = "Conway's Life Game"
  }
  componentDidMount() {
    const canvas = document.getElementById("game-board")
    const ctx = canvas.getContext('2d')
    this.setState({ ctx }, () => {
      this.initBoard()
    })
  }
  initBoard() {
    const matrix = Array(50).fill(Array(50).fill(0))
    this.setState({ matrix }, () => {
      const { ctx, matrix } = this.state
      this.drawMatrix(ctx, matrix)
    })
  }

  drawMatrix(ctx, matrix) {
    matrix.forEach( (arr, i) => {
      arr.forEach( (item, j) => {
        if(item == 1) {
          ctx.fillRect(i * 10, j * 10, 10, 10);
        } else {
          ctx.strokeRect(i * 10, j * 10, 10, 10);
        }
      })
    })
  }

  render() {
    return <div>
      <canvas width={width * 10} height={height * 10} id='game-board' className='canvas' />
    </div>
  }
}

export default LifeGame


// TODO:
//  1. 判断逻辑
//  2. 通过点击输入初始条件
//  3. 开始，停止和初始化
//  4. 写文章