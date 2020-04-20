import React, { Component } from 'react'
import { cloneDeep } from 'lodash'

const WIDTH = 50
const HEIGHT = 50
const ITEM_WIDTH = 10
let gameLoop = null

class LifeGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ctx: null,
      matrix: [],
      isOnGoing: false,
    }
  }
  componentWillMount() {
    document.title = "Conway's Life Game"
  }
  componentDidMount() {
    const canvas = document.getElementById("game-board")
    canvas.addEventListener('click', this.handleClick.bind(this))
    const ctx = canvas.getContext('2d')
    this.setState({ ctx }, () => {
      this.initBoard()
    })
  }
  initBoard() {
    const matrix = Array(50).fill(Array(50).fill(0))
    this.setState({ matrix: matrix }, () => {
      this.drawMatrix()
    })
  }

  startGame() {
    gameLoop = setInterval(() => {
      this.traverse()
    }, 500);
  }

  pauseGame() {
    clearInterval(gameLoop)
  }

  endGame() {
    clearInterval(gameLoop)
    this.initBoard()
  }
  drawMatrix() {
    const { ctx, matrix } = this.state
    ctx.clearRect(0,0, WIDTH * ITEM_WIDTH, HEIGHT * ITEM_WIDTH); 
    matrix.forEach( (arr, i) => {
      arr.forEach( (item, j) => {
        if(item == 1) {
          ctx.fillRect(i * ITEM_WIDTH, j * ITEM_WIDTH, ITEM_WIDTH, ITEM_WIDTH);
        } else {
          ctx.strokeRect(i * ITEM_WIDTH, j * ITEM_WIDTH, ITEM_WIDTH, ITEM_WIDTH);
        }
      })
    })
  }
  switchSingle(x, y) {
    const { ctx, matrix } = this.state
    matrix[x][y] = matrix[x][y] == 1 ? 0 : 1
    if(matrix[x][y] == 1) {
      ctx.fillRect(x * ITEM_WIDTH, y * ITEM_WIDTH, ITEM_WIDTH, ITEM_WIDTH);
    } else {
      ctx.strokeRect(x * ITEM_WIDTH, y * ITEM_WIDTH, ITEM_WIDTH, ITEM_WIDTH);
    }
  }
  // 遍历所有方格
  traverse() {
    const { matrix } = this.state
    const nextMatrix = cloneDeep(matrix)
    matrix.forEach( (arr, i) => {
      arr.forEach( (item, j) => {
        nextMatrix[i][j] = this.check(i, j)
      })
    })
    this.setState({ matrix: nextMatrix}, () => {
      this.drawMatrix()
    })
  }
  // 检查当前方格
  check(x, y) {
    const { matrix } = this.state
    const count =  this.getItemValue(x-1, y) 
      + this.getItemValue(x, y - 1)
      + this.getItemValue(x + 1, y - 1)
      + this.getItemValue(x - 1, y)
      + this.getItemValue(x + 1, y)
      + this.getItemValue(x - 1, y + 1)
      + this.getItemValue(x, y + 1)
      + this.getItemValue(x + 1, y + 1)

    if(count == 3) {
      // 周围细胞数为3时，一定为1
      return 1
    } else if(count == 2) {
      // 周围细胞数为2时，1保持1，0保持0
      return matrix[x][y]
    } else {
      // 其他情况，一定为0
      return 0
    }
  }

  getItemValue(x, y) {
    const { matrix } = this.state
    return (matrix[x] || [])[y] || 0
  }

  handleClick(e) {
    if(!this.state.isOnGoing) {
      const x = Math.floor(e.pageX / ITEM_WIDTH)
      const y = Math.floor(e.pageY / ITEM_WIDTH)
      this.switchSingle(x, y)
    }
    console.log(e.pageX, e.pageY)
  }

  render() {
    return <div>
      <canvas width={WIDTH * ITEM_WIDTH} height={HEIGHT * ITEM_WIDTH} id='game-board' className='canvas' />
      <button onClick={this.startGame.bind(this)}>开始</button>
      <button onClick={this.pauseGame.bind(this)}>暂停</button>
      <button onClick={this.endGame.bind(this)}>停止</button>

    </div>
  }
}

export default LifeGame


// TODO:
//  1. 判断逻辑
//  2. 通过点击输入初始条件
//  3. 开始，停止和初始化
//  4. 写文章